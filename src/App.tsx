import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Trophy,
  User,
  Users,
  Cpu,
  RotateCcw,
  Search,
  X,
  HelpCircle,
  TrendingDown,
  Flame,
  Award,
  ChevronRight,
  Zap,
  Info,
  BookOpen,
  ChevronDown
} from 'lucide-react';
import {
  PLAYERS_DATABASE,
  CATEGORIES,
  playerMatchesCategory,
  generateSolvableBoard
} from './playersData';
import { Player, Category } from './types';

// Standard generic function declaration to avoid JSX <T> tag syntax errors
function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function checkTicTacToeWinner(
  currentAnswers: (Player | 'incorrect' | null)[][],
  currentAnsweredBy: (1 | 2 | null)[][]
): 1 | 2 | null {
  const lines = [
    [[0,0], [0,1], [0,2]],
    [[1,0], [1,1], [1,2]],
    [[2,0], [2,1], [2,2]],
    [[0,0], [1,0], [2,0]],
    [[0,1], [1,1], [2,1]],
    [[0,2], [1,2], [2,2]],
    [[0,0], [1,1], [2,2]],
    [[0,2], [1,1], [2,0]],
  ];

  for (const line of lines) {
    const [[r1, c1], [r2, c2], [r3, c3]] = line;
    const a1 = currentAnswers[r1]?.[c1];
    const a2 = currentAnswers[r2]?.[c2];
    const a3 = currentAnswers[r3]?.[c3];
    
    if (a1 && a1 !== 'incorrect' && a2 && a2 !== 'incorrect' && a3 && a3 !== 'incorrect') {
      const o1 = currentAnsweredBy[r1]?.[c1];
      const o2 = currentAnsweredBy[r2]?.[c2];
      const o3 = currentAnsweredBy[r3]?.[c3];
      if (o1 === o2 && o2 === o3 && (o1 === 1 || o1 === 2)) {
        return o1 as 1 | 2;
      }
    }
  }
  return null;
}

export default function App() {
  // Game states: 'start' | 'playing' | 'gameover'
  const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover'>('start');
  const [gameMode, setGameMode] = useState<'solo' | 'bot' | 'duo' | 'daily_challenge'>('daily_challenge');
  const [playerName, setPlayerName] = useState<string>('');
  const [player2Name, setPlayer2Name] = useState<string>('חבר');
  const [startStep, setStartStep] = useState<1 | 2>(1);
  
  // Board categories
  const [cols, setCols] = useState<Category[]>([]);
  const [rows, setRows] = useState<Category[]>([]);
  
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  
  // Board cells answers state: 3 rows x 3 cols
  const [answers, setAnswers] = useState<(Player | 'incorrect' | null)[][]>([
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]);
  
  // Tracks who filled the cells in 'duo' mode: 1 | 2 | null
  const [answeredBy, setAnsweredBy] = useState<(1 | 2 | null)[][]>([
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]);

  // Turn management in 'duo' / 'bot': 1 (player 1) | 2 (player 2/bot)
  const [currentTurn, setCurrentTurn] = useState<1 | 2>(1);
  const [botThinking, setBotThinking] = useState<boolean>(false);
  
  // Active overlay target cell
  const [activeCell, setActiveCell] = useState<{ r: number; c: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [soloAttemptsLeft, setSoloAttemptsLeft] = useState<number>(9);
  const [showRarityGuide, setShowRarityGuide] = useState<boolean>(false);
  
  // Lives / strike system states: starts at 3 hearts
  const [p1Lives, setP1Lives] = useState<number>(3);
  const [p2Lives, setP2Lives] = useState<number>(3);
  const [showStartScreenRules, setShowStartScreenRules] = useState<boolean>(false);
  const [isCorrectionMode, setIsCorrectionMode] = useState<boolean>(false);

  // Online multiplayer states
  const [isOnlineGame, setIsOnlineGame] = useState<boolean>(false);
  const [onlineRoomCode, setOnlineRoomCode] = useState<string>('');
  const [onlinePlayerRole, setOnlinePlayerRole] = useState<1 | 2 | null>(null);
  const [onlineAction, setOnlineAction] = useState<'host' | 'join' | 'local'>('local');
  const [joinRoomCodeInput, setJoinRoomCodeInput] = useState<string>('');
  const [onlineRoomStatus, setOnlineRoomStatus] = useState<'waiting' | 'playing' | 'gameover' | ''>('');
  const [copyStatus, setCopyStatus] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(30);

  // Quick helper to write states easily
  const [player1Name, setPlayer1Name] = useState<string>('');

  // Handle Online Creation
  const handleCreateOnlineRoom = async () => {
    try {
      playSound('click');
      if (!playerName.trim()) {
        triggerNotification('אנא הזן כינוי שחקן כדי להמשיך!', 'error');
        return;
      }
      
      const { cols: newCols, rows: newRows } = generateSolvableBoard();
      
      const response = await fetch('/api/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cols: newCols,
          rows: newRows,
          player1Name: playerName
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to create room server-side');
      }
      
      const room = await response.json();
      
      setCols(room.cols);
      setRows(room.rows);
      setAnswers(room.answers);
      setAnsweredBy(room.answeredBy);
      setOnlineRoomCode(room.code);
      setOnlinePlayerRole(1); // Host
      setOnlineRoomStatus('waiting');
      setIsOnlineGame(true);
      setGameState('playing');
      
      triggerNotification(`החדר נוצר בהצלחה! קוד: ${room.code}`, 'success');
    } catch (err) {
      console.error(err);
      triggerNotification('שגיאה ביצירת החדר, נסו שוב', 'error');
    }
  };

  // Handle Online Join
  const handleJoinOnlineRoom = async (codeToJoin?: string) => {
    try {
      playSound('click');
      const finalCode = (codeToJoin || joinRoomCodeInput).trim().toUpperCase();
      if (!finalCode) {
        triggerNotification('אנא הזן קוד חדר!', 'error');
        return;
      }
      if (!playerName.trim()) {
        triggerNotification('אנא הזן כינוי שחקן כדי להמשיך!', 'error');
        return;
      }
      
      const response = await fetch(`/api/rooms/${finalCode}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerName: playerName
        })
      });
      
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'החדר לא נמצא או בתפוסה מלאה');
      }
      
      const data = await response.json();
      const room = data.room;
      
      setCols(room.cols);
      setRows(room.rows);
      setAnswers(room.answers);
      setAnsweredBy(room.answeredBy);
      
      if (data.role === 1) {
        setPlayer1Name(room.player1Name);
        setPlayer2Name(room.player2Name || 'אורח');
      } else {
        setPlayer1Name(room.player1Name);
        setPlayer2Name(room.player2Name || playerName);
      }
      
      setOnlineRoomCode(room.code);
      setOnlinePlayerRole(data.role); 
      setOnlineRoomStatus(room.status);
      setIsOnlineGame(true);
      setGameState('playing');
      
      triggerNotification(`הצטרפת בהצלחה לחדר ${room.code}!`, 'success');
    } catch (err: any) {
      console.error(err);
      triggerNotification(err.message || 'שגיאה בחיבור לחדר, בדוק את הקוד', 'error');
    }
  };

  // Handle Rematch Online
  const handleRematchOnline = async () => {
    try {
      playSound('click');
      const { cols: newCols, rows: newRows } = generateSolvableBoard();
      const response = await fetch(`/api/rooms/${onlineRoomCode}/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cols: newCols,
          rows: newRows
        })
      });
      if (response.ok) {
        triggerNotification('המשחק אותחל מחדש לסיבוב נוסף! 🏀', 'success');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Real-time polling listener
  useEffect(() => {
    if (!isOnlineGame || !onlineRoomCode) return;

    let isSubscribed = true;
    
    const pollRoom = async () => {
      try {
        const response = await fetch(`/api/rooms/${onlineRoomCode}`);
        if (!response.ok) return;
        const room = await response.json();
        
        if (!isSubscribed) return;

        setOnlineRoomStatus(room.status);
        setCurrentTurn(room.currentTurn);
        if (room.p1Lives !== undefined) setP1Lives(room.p1Lives);
        if (room.p2Lives !== undefined) setP2Lives(room.p2Lives);
        
        if (onlinePlayerRole === 1) {
          if (room.player2Name && player2Name !== room.player2Name) {
            setPlayer2Name(room.player2Name);
            triggerNotification(`השחקן ${room.player2Name} הצטרף למשחק!`, 'success');
          }
        } else {
          setPlayer1Name(room.player1Name); 
          setPlayer2Name(room.player2Name);
        }
        
        if (!activeCell) {
          const answersChanged = JSON.stringify(answers) !== JSON.stringify(room.answers);
          if (answersChanged) {
            setAnswers(room.answers);
            setAnsweredBy(room.answeredBy);
            
            let newlyCompleted = false;
            for (let r = 0; r < 3; r++) {
              for (let c = 0; c < 3; c++) {
                if (answers[r][c] === null && room.answers[r][c] !== null) {
                  newlyCompleted = true;
                }
              }
            }
            if (newlyCompleted) {
              playSound('swish');
            }
          }
        }
        
        if (room.status === 'gameover' && gameState !== 'gameover') {
          setAnswers(room.answers);
          setAnsweredBy(room.answeredBy);
          setGameState('gameover');
          playSound('buzzer');
        } else if (room.status === 'playing' && gameState === 'start') {
          setGameState('playing');
        } else if (room.status === 'playing' && gameState === 'gameover') {
          setCols(room.cols);
          setRows(room.rows);
          setAnswers(room.answers);
          setAnsweredBy(room.answeredBy);
          setGameState('playing');
          triggerNotification('המשחק אותחל לסיבוב נוסף! 🏀', 'success');
        }

      } catch (err) {
        console.error('Error polling room:', err);
      }
    };

    pollRoom();
    const intervalId = setInterval(pollRoom, 1500);

    return () => {
      isSubscribed = false;
      clearInterval(intervalId);
    };
  }, [isOnlineGame, onlineRoomCode, onlinePlayerRole, answers, activeCell, gameState, player2Name]);

  const getDailySeed = () => {
    const d = new Date();
    return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  };

  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const generateDailyBoard = (seed: number) => {
    const indices = Array.from({ length: CATEGORIES.length }, (_, i) => i);
    let currentSeed = seed;
    indices.sort((a, b) => {
      const r = seededRandom(currentSeed);
      currentSeed += 1;
      return r - 0.5;
    });

    let attempts = 0;
    while (attempts < 100) {
      const startIdx = attempts * 6;
      if (startIdx + 6 > CATEGORIES.length) break;
      const potentialCols = [CATEGORIES[indices[startIdx]], CATEGORIES[indices[startIdx+1]], CATEGORIES[indices[startIdx+2]]];
      const potentialRows = [CATEGORIES[indices[startIdx+3]], CATEGORIES[indices[startIdx+4]], CATEGORIES[indices[startIdx+5]]];
      
      const colIds = potentialCols.map(c => c.id);
      const rowIds = potentialRows.map(r => r.id);

      const hasSolutions = colIds.every((colId) => 
        rowIds.every((rowId) => {
          const matches = PLAYERS_DATABASE.filter(p => playerMatchesCategory(p, colId) && playerMatchesCategory(p, rowId));
          return matches.length >= 2;
        })
      );

      if (hasSolutions) {
        return { cols: potentialCols, rows: potentialRows };
      }
      attempts++;
    }

    return {
      cols: [CATEGORIES[0], CATEGORIES[1], CATEGORIES[10]],
      rows: [CATEGORIES[12], CATEGORIES[16], CATEGORIES[19]]
    };
  };

  const startDailyChallenge = () => {
    playSound('click');
    setGameMode('daily_challenge');
    
    const dailyKey = `bball_daily_save_${getDailySeed()}`;
    const saved = localStorage.getItem(dailyKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCols(parsed.cols);
        setRows(parsed.rows);
        setAnswers(parsed.answers);
        setAnsweredBy(parsed.answeredBy);
        setSoloAttemptsLeft(parsed.soloAttemptsLeft);
        setP1Lives(parsed.p1Lives !== undefined ? parsed.p1Lives : 3);
        setP2Lives(parsed.p2Lives !== undefined ? parsed.p2Lives : 3);
        setGameState('playing');
        triggerNotification('ברוכים השבים! האתגר היומי שוחזר מאותה נקודה הארוכה.', 'success');
        return;
      } catch (err) {
        console.error(err);
      }
    }

    const { cols: dailyCols, rows: dailyRows } = generateDailyBoard(getDailySeed());
    setCols(dailyCols);
    setRows(dailyRows);
    setAnswers([
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]);
    setAnsweredBy([
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]);
    setSoloAttemptsLeft(9);
    setP1Lives(3);
    setP2Lives(3);
    setGameState('playing');
    
    const initialState = {
      cols: dailyCols,
      rows: dailyRows,
      answers: [[null, null, null], [null, null, null], [null, null, null]],
      answeredBy: [[null, null, null], [null, null, null], [null, null, null]],
      soloAttemptsLeft: 9,
      p1Lives: 3,
      p2Lives: 3
    };
    localStorage.setItem(dailyKey, JSON.stringify(initialState));
    triggerNotification('בהצלחה באתגר היומי של היום! 9 זריקות לסל ו-3 לבבות.', 'info');
  };

  useEffect(() => {
    if (gameMode === 'daily_challenge' && gameState === 'playing' && cols.length > 0) {
      const dailyKey = `bball_daily_save_${getDailySeed()}`;
      const stateObj = {
        cols,
        rows,
        answers,
        answeredBy,
        soloAttemptsLeft,
        p1Lives,
        p2Lives
      };
      localStorage.setItem(dailyKey, JSON.stringify(stateObj));
    }
  }, [answers, answeredBy, soloAttemptsLeft, gameMode, gameState, cols, rows, p1Lives, p2Lives]);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Synthesizes pleasant retro basketball audio effects natively inside the browser!
  const playSound = (type: 'swish' | 'brick' | 'click' | 'buzzer') => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'swish') {
        osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1000, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.2);
      } else if (type === 'brick') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(130, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.25);
      } else if (type === 'click') {
        osc.frequency.setValueAtTime(700, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
      } else if (type === 'buzzer') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.4);
      }
    } catch (e) {
      // Ignored
    }
  };

  const rarityScores = useMemo(() => {
    let p1 = 0;
    let p2 = 0;
    let counts = 0;

    answers.forEach((row, ri) => {
      row.forEach((cell, ci) => {
        if (cell === null) return;
        
        const score = cell === 'incorrect' ? 100 : cell.popularity;
        const owner = answeredBy[ri][ci];

        if (gameMode === 'solo' || gameMode === 'daily_challenge') {
          p1 += score;
          counts++;
        } else {
          if (owner === 1) {
            p1 += score;
          } else if (owner === 2) {
            p2 += score;
          }
        }
      });
    });

    return { p1, p2, counts };
  }, [answers, answeredBy, gameMode]);

  const initBoard = () => {
    const { cols: newCols, rows: newRows } = generateSolvableBoard();
    setCols(newCols);
    setRows(newRows);
    setAnswers([
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]);
    setAnsweredBy([
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]);
    setSoloAttemptsLeft(9);
    setCurrentTurn(1);
    setBotThinking(false);
    setP1Lives(3);
    setP2Lives(3);
    setIsCorrectionMode(false);
  };

  useEffect(() => {
    initBoard();
  }, []);

  useEffect(() => {
    if (activeCell && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 80);
    }
  }, [activeCell]);

  const triggerNotification = (message: string, type: 'success' | 'error' | 'info') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3200);
  };

  const handleTimeOut = () => {
    setActiveCell(null);
    playSound('buzzer');

    const nextTurn = currentTurn === 1 ? 2 : 1;
    let nextP1Lives = p1Lives;
    let nextP2Lives = p2Lives;

    if (currentTurn === 1) {
      nextP1Lives = Math.max(0, p1Lives - 1);
      setP1Lives(nextP1Lives);
      triggerNotification('הפרת שעון זריקות! איבדת לב 💔 והתור עבר.', 'error');
    } else {
      nextP2Lives = Math.max(0, p2Lives - 1);
      setP2Lives(nextP2Lives);
      triggerNotification('שעון ה-30 שניות פקע ליריב! התור עבר אליך.', 'info');
    }

    const isGameOver = nextP1Lives <= 0 || nextP2Lives <= 0;
    const nextStatus = isGameOver ? 'gameover' : 'playing';

    if (isGameOver) {
      setGameState('gameover');
    }

    setCurrentTurn(nextTurn);

    if (isOnlineGame) {
      if (onlinePlayerRole === currentTurn) {
        fetch(`/api/rooms/${onlineRoomCode}/move`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            answers,
            answeredBy,
            currentTurn: nextTurn,
            rarityScores,
            status: nextStatus,
            p1Lives: nextP1Lives,
            p2Lives: nextP2Lives
          })
        }).catch(err => console.error('Error posting timeout move:', err));
      }
    }
  };

  // Reset timer to 30 whenever turn changes
  useEffect(() => {
    if (gameState !== 'playing') return;
    if (gameMode !== 'bot' && gameMode !== 'duo') return;

    setTimeLeft(30);
  }, [currentTurn, gameState, gameMode]);

  // Turn timer interval countdown (shot clock)
  useEffect(() => {
    if (gameState !== 'playing') return;
    if (gameMode !== 'bot' && gameMode !== 'duo') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentTurn, gameState, gameMode, p1Lives, p2Lives, isOnlineGame, onlinePlayerRole, answers, answeredBy, rarityScores, onlineRoomCode]);

  const executeBotTurn = () => {
    if (gameState !== 'playing' || gameMode !== 'bot' || currentTurn !== 2) return;

    setBotThinking(true);
    
    // Bot chooses move instantly in 50ms
    setTimeout(() => {
      const lines = [
        [[0,0], [0,1], [0,2]],
        [[1,0], [1,1], [1,2]],
        [[2,0], [2,1], [2,2]],
        [[0,0], [1,0], [2,0]],
        [[0,1], [1,1], [2,1]],
        [[0,2], [1,2], [2,2]],
        [[0,0], [1,1], [2,2]],
        [[0,2], [1,1], [2,0]],
      ];

      let target: { r: number; c: number } | null = null;

      // 1. Try to WIN immediately (Bot has 2, empty is 1)
      for (const line of lines) {
        const tokens = line.map(([r, c]) => answeredBy[r][c]);
        const botTokensCount = tokens.filter(tok => tok === 2).length;
        const emptyIndex = tokens.findIndex(([r, c], idx) => tokens[idx] === null && answers[r][c] === null);
        if (botTokensCount === 2 && emptyIndex !== -1) {
          const [tr, tc] = line[emptyIndex];
          target = { r: tr, c: tc };
          break;
        }
      }

      // 2. Try to BLOCK Player 1 (Player has 2, empty is 1)
      if (!target) {
        for (const line of lines) {
          const tokens = line.map(([r, c]) => answeredBy[r][c]);
          const playerTokensCount = tokens.filter(tok => tok === 1).length;
          const emptyIndex = tokens.findIndex(([r, c], idx) => tokens[idx] === null && answers[r][c] === null);
          if (playerTokensCount === 2 && emptyIndex !== -1) {
            const [tr, tc] = line[emptyIndex];
            target = { r: tr, c: tc };
            break;
          }
        }
      }

      // 3. Take center if empty
      if (!target && answers[1][1] === null) {
        target = { r: 1, c: 1 };
      }

      // 4. Default to random choice of available cells
      if (!target) {
        const emptyCells: { r: number; c: number }[] = [];
        for (let r = 0; r < 3; r++) {
          for (let c = 0; c < 3; c++) {
            if (answers[r][c] === null) {
              emptyCells.push({ r, c });
            }
          }
        }
        if (emptyCells.length > 0) {
          target = randomChoice(emptyCells);
        }
      }

      if (!target) {
        setBotThinking(false);
        setCurrentTurn(1);
        return;
      }

      const colCat = cols[target.c];
      const rowCat = rows[target.r];

      const correctPlayers = PLAYERS_DATABASE.filter(p => 
        playerMatchesCategory(p, colCat.id) && playerMatchesCategory(p, rowCat.id)
      );

      const success = Math.random() < 0.8 && correctPlayers.length > 0;

      if (success) {
        const chosen = randomChoice(correctPlayers);
        
        setAnswers(prev => {
          const next = [...prev.map(row => [...row])];
          next[target!.r][target!.c] = chosen;
          return next;
        });
        setAnsweredBy(prev => {
          const next = [...prev.map(row => [...row])];
          next[target!.r][target!.c] = 2;
          return next;
        });

        playSound('swish');
        triggerNotification(`עודד בוט-טש קלע לסל עם השחקן: ${chosen.name}! (+${chosen.popularity} נק')`, 'info');
      } else {
        // On Tic-Tac-Toe bot miss, the cell remains null
        setAnswers(prev => {
          const next = [...prev.map(row => [...row])];
          next[target!.r][target!.c] = null;
          return next;
        });
        setAnsweredBy(prev => {
          const next = [...prev.map(row => [...row])];
          next[target!.r][target!.c] = null;
          return next;
        });
        setP2Lives(prev => Math.max(0, prev - 1));

        playSound('brick');
        triggerNotification('עודד בוט-טש החטיא מהקו! המשבצת נותרה חופשית.', 'error');
      }

      setBotThinking(false);
      setCurrentTurn(1);
    }, 1400);
  };

  useEffect(() => {
    if (gameMode === 'bot' && currentTurn === 2 && gameState === 'playing' && !botThinking) {
      executeBotTurn();
    }
  }, [currentTurn, gameMode, gameState]);

  const isBoardFilledWithAnswers = useMemo(() => {
    return answers.every(row => row.every(cell => cell !== null));
  }, [answers]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const isTicTacToe = gameMode === 'bot' || gameMode === 'duo';
    const isFullySolved = answers.every(row => row.every(cell => cell !== null && cell !== 'incorrect'));

    if (isTicTacToe) {
      const winner = checkTicTacToeWinner(answers, answeredBy);
      const boardFilled = answers.every(row => row.every(cell => cell !== null && cell !== 'incorrect'));
      if (winner !== null || boardFilled || p1Lives <= 0 || p2Lives <= 0) {
        setGameState('gameover');
        playSound('buzzer');
      }
    } else {
      if (isCorrectionMode) {
        if (isFullySolved) {
          setGameState('gameover');
          playSound('swish');
          triggerNotification('כל הכבוד! תיקנת את כל השגיאות והשלמת את הלוח!', 'success');
        } else if ((gameMode === 'solo' || gameMode === 'daily_challenge') && (soloAttemptsLeft <= 0 || p1Lives <= 0)) {
          setGameState('gameover');
          playSound('buzzer');
        } else if (p1Lives <= 0 || p2Lives <= 0) {
          setGameState('gameover');
          playSound('buzzer');
        }
      } else {
        if (gameMode === 'solo' || gameMode === 'daily_challenge') {
          if (soloAttemptsLeft <= 0 || p1Lives <= 0 || isBoardFilledWithAnswers) {
            setGameState('gameover');
            playSound('buzzer');
          }
        } else {
          if (p1Lives <= 0 || p2Lives <= 0 || isBoardFilledWithAnswers) {
            setGameState('gameover');
            playSound('buzzer');
          }
        }
      }
    }
  }, [answers, answeredBy, soloAttemptsLeft, isBoardFilledWithAnswers, gameMode, gameState, p1Lives, p2Lives, isCorrectionMode]);

  const filteredPlayers = useMemo(() => {
    if (searchQuery.trim().length < 2) return [];
    const query = searchQuery.trim().toLowerCase();
    
    return PLAYERS_DATABASE.filter(p => p.name.toLowerCase().includes(query))
      .sort((a, b) => {
        const startA = a.name.toLowerCase().startsWith(query);
        const startB = b.name.toLowerCase().startsWith(query);
        if (startA && !startB) return -1;
        if (!startA && startB) return 1;
        return b.popularity - a.popularity;
      })
      .slice(0, 10);
  }, [searchQuery]);

  const tttResultFeedback = useMemo(() => {
    const isTicTacToe = gameMode === 'bot' || gameMode === 'duo';
    if (!isTicTacToe) return '';

    const p1Disp = playerName || 'שחקן 1';
    const p2Disp = gameMode === 'bot' ? 'עודד בוט-טש' : (player2Name || 'חבר');

    const winner = checkTicTacToeWinner(answers, answeredBy);
    if (winner === 1) {
      return `ניצחון מוחץ ל-${p1Disp}! 🏆 השלים 3 ברצף (איקס)!`;
    } else if (winner === 2) {
      return `ניצחון מטורף ל-${p2Disp}! 🏆 השלים 3 ברצף (עיגול)!`;
    }

    if (p1Lives === 0) {
      return `הפסד מבאס ל-${p1Disp}! 💔 נגמרו כל הלבבות על המגרש.`;
    } else if (p2Lives === 0) {
      return `ניצחון ל-${p1Disp}! 💔 ל-${p2Disp} נגמרו כל הלבבות.`;
    }

    // Counts
    let p1Count = 0;
    let p2Count = 0;
    answers.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell && cell !== 'incorrect') {
          if (answeredBy[r][c] === 1) p1Count++;
          else if (answeredBy[r][c] === 2) p2Count++;
        }
      });
    });

    if (p1Count > p2Count) {
      return `ניצחון בנקודות ל-${p1Disp}! 🏀 (${p1Count} משבצות לעומת ${p2Count})`;
    } else if (p2Count > p1Count) {
      return `ניצחון בנקודות ל-${p2Disp}! 🏀 (${p2Count} משבצות לעומת ${p1Count})`;
    }

    return 'תיקו דרמטי על הפרקט! 🤝';
  }, [answers, answeredBy, gameMode, playerName, player2Name, p1Lives, p2Lives]);

  const handleCellClick = (r: number, c: number) => {
    if (gameMode === 'bot' && currentTurn === 2) {
      triggerNotification('חכה, עודד בוט-טש מתכנן מהלך!', 'info');
      return;
    }

    if (isOnlineGame) {
      if (onlineRoomStatus === 'waiting') {
        triggerNotification('מחכה שהיריב יצטרף לחדר!', 'info');
        return;
      }
      if (onlinePlayerRole !== currentTurn) {
        triggerNotification('זה לא התור שלך! חכה ליריב.', 'error');
        return;
      }
    }

    if (answers[r][c] !== null && answers[r][c] !== 'incorrect') {
      triggerNotification('משבצת זו כבר פוענחה בהצלחה!', 'info');
      return;
    }

    setActiveCell({ r, c });
    setSearchQuery('');
  };

  const handleSelectPlayer = (player: Player) => {
    if (!activeCell) return;
    const { r, c } = activeCell;
    const colCat = cols[c];
    const rowCat = rows[r];

    const matchCol = playerMatchesCategory(player, colCat.id);
    const matchRow = playerMatchesCategory(player, rowCat.id);

    const nextAnswers = [...answers.map(row => [...row])];
    const nextAnsweredBy = [...answeredBy.map(row => [...row])];
    let isCorrect = false;

    const isTicTacToe = gameMode === 'bot' || gameMode === 'duo';

    if (matchCol && matchRow) {
      nextAnswers[r][c] = player;
      nextAnsweredBy[r][c] = currentTurn;
      isCorrect = true;
      playSound('swish');
      triggerNotification(`קליעה חלקה! ${player.name} מתאים לחלוטין!`, 'success');
    } else {
      if (isTicTacToe) {
        nextAnswers[r][c] = null;
        nextAnsweredBy[r][c] = null;
      } else {
        nextAnswers[r][c] = 'incorrect';
        nextAnsweredBy[r][c] = currentTurn;
      }
      isCorrect = false;
      playSound('buzzer');
      triggerNotification(`פספוס! ${player.name} לא מתאים לקטגוריות שנבחרו. (הפסדת לב 💔)`, 'error');
    }

    const nextTurn = currentTurn === 1 ? 2 : 1;

    // Calculate next scoring variables
    let nextScores = { p1: rarityScores.p1, p2: rarityScores.p2 };
    const score = !isCorrect ? 100 : player.popularity;
    if (currentTurn === 1) {
      nextScores.p1 += score;
    } else {
      nextScores.p2 += score;
    }

    let nextP1Lives = p1Lives;
    let nextP2Lives = p2Lives;
    if (!isCorrect) {
      if (currentTurn === 1) {
        nextP1Lives = Math.max(0, p1Lives - 1);
        setP1Lives(nextP1Lives);
      } else {
        nextP2Lives = Math.max(0, p2Lives - 1);
        setP2Lives(nextP2Lives);
      }
    }

    let isGameOver = false;
    if (isTicTacToe) {
      const winner = checkTicTacToeWinner(nextAnswers, nextAnsweredBy);
      // For TTT, a board is filled if every square is correctly claimed
      const boardFilled = nextAnswers.every(row => row.every(cell => cell !== null && cell !== 'incorrect'));
      if (winner !== null || boardFilled || nextP1Lives <= 0 || nextP2Lives <= 0) {
        isGameOver = true;
      }
    } else {
      isGameOver = nextAnswers.every(row => row.every(cell => cell !== null));
    }
    const nextStatus = isGameOver ? 'gameover' : 'playing';

    setAnswers(nextAnswers);
    setAnsweredBy(nextAnsweredBy);

    if (isOnlineGame) {
      setCurrentTurn(nextTurn);
      fetch(`/api/rooms/${onlineRoomCode}/move`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: nextAnswers,
          answeredBy: nextAnsweredBy,
          currentTurn: nextTurn,
          rarityScores: nextScores,
          status: nextStatus,
          p1Lives: nextP1Lives,
          p2Lives: nextP2Lives
        })
      }).catch(err => console.error('Error posting move:', err));
    } else {
      if (gameMode === 'solo' || gameMode === 'daily_challenge') {
        setSoloAttemptsLeft(prev => prev - 1);
      } else {
        setCurrentTurn(nextTurn);
      }
    }

    setActiveCell(null);
  };

  const handleGiveUpCell = () => {
    if (!activeCell) return;
    const { r, c } = activeCell;

    const nextAnswers = [...answers.map(row => [...row])];
    const nextAnsweredBy = [...answeredBy.map(row => [...row])];
    nextAnswers[r][c] = 'incorrect';
    nextAnsweredBy[r][c] = currentTurn;

    playSound('brick');
    triggerNotification('משבצת סומנה ככהחטאה. 100+ נקודות נדירות.', 'info');

    const nextTurn = currentTurn === 1 ? 2 : 1;
    const isGameOver = nextAnswers.every(row => row.every(cell => cell !== null));
    const nextStatus = isGameOver ? 'gameover' : 'playing';

    let nextScores = { p1: rarityScores.p1, p2: rarityScores.p2 };
    if (currentTurn === 1) {
      nextScores.p1 += 100;
    } else {
      nextScores.p2 += 100;
    }

    let nextP1Lives = p1Lives;
    let nextP2Lives = p2Lives;
    if (currentTurn === 1) {
      nextP1Lives = Math.max(0, p1Lives - 1);
      setP1Lives(nextP1Lives);
    } else {
      nextP2Lives = Math.max(0, p2Lives - 1);
      setP2Lives(nextP2Lives);
    }

    setAnswers(nextAnswers);
    setAnsweredBy(nextAnsweredBy);

    if (isOnlineGame) {
      setCurrentTurn(nextTurn);
      fetch(`/api/rooms/${onlineRoomCode}/move`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: nextAnswers,
          answeredBy: nextAnsweredBy,
          currentTurn: nextTurn,
          rarityScores: nextScores,
          status: nextStatus,
          p1Lives: nextP1Lives,
          p2Lives: nextP2Lives
        })
      }).catch(err => console.error('Error posting move:', err));
    } else {
      if (gameMode === 'solo' || gameMode === 'daily_challenge') {
        setSoloAttemptsLeft(prev => prev - 1);
      } else {
        setCurrentTurn(nextTurn);
      }
    }

    setActiveCell(null);
  };

  const getCellClassName = (r: number, c: number) => {
    const isInteracted = answers[r][c] !== null;
    if (!isInteracted) {
      return 'bg-slate-900/60 border border-slate-800/80 hover:border-orange-500 hover:bg-slate-800/20 cursor-pointer h-full';
    }

    const answer = answers[r][c];
    const owner = answeredBy[r][c];

    if (answer === 'incorrect') {
      return 'bg-red-950/40 border border-red-500/50 text-red-400 h-full';
    }

    if (answer && answer !== 'incorrect') {
      if (owner === 1) {
        return 'bg-sky-950/70 border border-sky-500 text-sky-100 h-full';
      } else {
        return 'bg-rose-950/70 border border-rose-500 text-rose-100 h-full';
      }
    }

    return 'bg-slate-900 border border-slate-700 text-slate-300 h-full';
  };

  const handleStartGame = () => {
    playSound('click');
    initBoard();
    setGameState('playing');
  };

  return (
    <div className="w-full h-screen max-h-screen parquet-bg text-slate-100 flex flex-col justify-between overflow-hidden relative select-none" dir="rtl">
      
      {/* Background Court styling */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.06] bg-[radial-gradient(circle_at_50%_50%,transparent_60%,#f97316_61%,#f97316_63%,transparent_64%)]" />
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(90deg,transparent_49%,#f97316_50%,#f97316_51%,transparent_52%)]" />

      {/* Floating alert status notification popup */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -45, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full text-xs font-black shadow-2xl flex items-center gap-1.5 border ${
              notification.type === 'success' 
                ? 'bg-emerald-950/95 text-emerald-400 border-emerald-500/50' 
                : notification.type === 'error'
                  ? 'bg-rose-950/95 text-rose-400 border-rose-500/50'
                  : 'bg-blue-950/95 text-blue-400 border-blue-500/50'
            }`}
          >
            <Zap className="w-3.5 h-3.5 spin-slow" />
            <span>{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VIEW 1: PREMIUM STARTUP WELCOMING PAGE */}
      {gameState === 'start' && (
        <div className="flex-grow flex items-center justify-center p-3 z-10 w-full max-w-xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[480px] max-h-[92vh]"
          >
            {/* Elegant orange and gold header divider */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500" />
            
            {/* Header */}
            <div className="flex flex-col items-center">
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                className="w-12 h-12 bg-gradient-to-tr from-orange-500 to-amber-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/20 mb-2 text-2xl"
              >
                🏀
              </motion.div>
              
              <h1 className="text-xl md:text-3xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                איקס עיגול כדורסל ישראלי
              </h1>
              
              <p className="text-[10px] md:text-xs text-slate-400 text-center font-medium mt-1">
                אתגר ה-Immaculate Grid הישראלי הגדול! בדקו את ההבנה והזיכרון הספורטיבי שלכם.
              </p>
            </div>

            {/* MULTI-STAGE STEP WIZARD CONTENT */}
            <AnimatePresence mode="wait">
              {startStep === 1 ? (
                <motion.div
                  key="step-user-name"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.2 }}
                  className="my-4 space-y-4 flex-grow flex flex-col justify-center"
                >
                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-center space-y-3">
                    <span className="block text-slate-200 text-sm font-bold">1. מה שמכם על הפרקט? 🏀</span>
                    
                    <div className="max-w-xs mx-auto">
                      <input 
                        type="text" 
                        value={playerName}
                        maxLength={14}
                        onChange={(e) => {
                          const val = e.target.value;
                          setPlayerName(val);
                          setPlayer1Name(val);
                        }}
                        placeholder="הזן שמך..." 
                        className="w-full bg-slate-900 border-2 border-slate-800 focus:border-orange-500 rounded-lg py-2 px-3 text-sm text-white text-center font-black focus:outline-none transition-all"
                      />
                      <span className="block text-[9px] text-slate-500 mt-1.5">הכינוי שלכם יופיע בלוח מדד הנדירות</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (!playerName.trim()) {
                        triggerNotification('אנא הזן כינוי שחקן כדי להמשיך!', 'error');
                        return;
                      }
                      playSound('click');
                      setStartStep(2);
                    }}
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black py-2.5 rounded-xl text-xs shadow-lg shadow-orange-500/25 cursor-pointer text-center flex items-center justify-center gap-1.5 hover:from-orange-400 hover:to-amber-400 transition-all font-sans"
                  >
                    המשך לבחירת מצב משחק 🏀
                    <ChevronRight className="w-4 h-4 stroke-[3px]" />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="step-game-modes"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.2 }}
                  className="my-4 space-y-4 flex-grow flex flex-col justify-center"
                >
                  <div>
                    <span className="block text-slate-300 text-xs font-bold mb-2 text-center">2. בחר סוג או כיוון משחק:</span>
                    
                    <div className="grid grid-cols-3 gap-2">
                      {/* DAILY CHALLENGE */}
                      <button 
                        onClick={() => { playSound('click'); setGameMode('daily_challenge'); }}
                        className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center justify-center text-center relative ${
                          gameMode === 'daily_challenge' 
                            ? 'border-orange-500 bg-orange-500/10 text-white' 
                            : 'border-slate-850 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <span className="absolute -top-2 right-1 bg-gradient-to-r from-rose-500 to-orange-500 text-[6px] text-white px-1.5 py-0.2 rounded-full font-black animate-pulse">
                          יומי 🔥
                        </span>
                        <Award className="w-5 h-5 text-yellow-400 mb-1" />
                        <span className="text-[11px] font-black">האתגר היומי</span>
                        <span className="text-[7.5px] opacity-70">קלאסי סולו</span>
                      </button>

                      {/* VS BOT */}
                      <button 
                        onClick={() => { playSound('click'); setGameMode('bot'); }}
                        className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center justify-center text-center relative ${
                          gameMode === 'bot' 
                            ? 'border-orange-500 bg-orange-500/10 text-white' 
                            : 'border-slate-850 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <span className="absolute -top-2 right-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-[6px] text-white px-1.5 py-0.2 rounded-full font-black animate-pulse">
                          איקס עיגול ❌⭕
                        </span>
                        <Cpu className="w-5 h-5 text-amber-400 mb-1" />
                        <span className="text-[11px] font-black">נגד בוט</span>
                        <span className="text-[7.5px] opacity-70">איקס עיגול</span>
                      </button>

                      {/* COMPANION DUO */}
                      <button 
                        onClick={() => { playSound('click'); setGameMode('duo'); }}
                        className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center justify-center text-center relative ${
                          gameMode === 'duo' 
                            ? 'border-sky-500 bg-sky-500/10 text-white' 
                            : 'border-slate-850 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <span className="absolute -top-2 right-1 bg-gradient-to-r from-sky-400 to-blue-500 text-[6px] text-white px-1.5 py-0.2 rounded-full font-black animate-pulse">
                          חבר 👥
                        </span>
                        <Users className="w-5 h-5 text-sky-400 mb-1" />
                        <span className="text-[11px] font-black">משחק מול חבר</span>
                        <span className="text-[7.5px] opacity-70">מקומי / אונליין</span>
                      </button>
                    </div>
                  </div>

                  {/* Companion lobby setup if DUO chosen */}
                  {gameMode === 'duo' && (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }} 
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-slate-950/70 p-3 rounded-xl border border-slate-850 text-right space-y-3"
                    >
                      <div className="grid grid-cols-3 gap-1 bg-slate-900 rounded-lg p-1">
                        <button
                          type="button"
                          onClick={() => { playSound('click'); setOnlineAction('local'); setIsOnlineGame(false); }}
                          className={`text-center py-1.5 text-[10px] font-black rounded transition-all ${
                            onlineAction === 'local' 
                              ? 'bg-sky-500 text-slate-950' 
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          מקומי (מסך אחד)
                        </button>
                        <button
                          type="button"
                          onClick={() => { playSound('click'); setOnlineAction('host'); setIsOnlineGame(true); }}
                          className={`text-center py-1.5 text-[10px] font-black rounded transition-all ${
                            onlineAction === 'host' 
                              ? 'bg-sky-500 text-slate-950' 
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          מארח אונליין
                        </button>
                        <button
                          type="button"
                          onClick={() => { playSound('click'); setOnlineAction('join'); setIsOnlineGame(true); }}
                          className={`text-center py-1.5 text-[10px] font-black rounded transition-all ${
                            onlineAction === 'join' 
                              ? 'bg-sky-500 text-slate-950' 
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          הצטרף אונליין
                        </button>
                      </div>

                      {onlineAction === 'local' ? (
                        <div className="space-y-2">
                          <label className="text-[10px] text-slate-400 block font-bold">משחק מקומי באותו מכשיר - שמות שחקנים:</label>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[9px] text-slate-500 block mb-0.5">שם שחקן 1 (❌):</label>
                              <input 
                                type="text" 
                                value={playerName}
                                maxLength={14}
                                onChange={(e) => {
                                  setPlayerName(e.target.value);
                                  setPlayer1Name(e.target.value);
                                }}
                                placeholder="שם שחקן 1" 
                                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-xs text-center font-bold text-white focus:outline-none focus:border-sky-500"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] text-slate-500 block mb-0.5 font-sans">שם שחקן 2 (⭕):</label>
                              <input 
                                type="text" 
                                value={player2Name}
                                maxLength={14}
                                onChange={(e) => setPlayer2Name(e.target.value)}
                                placeholder="שם שחקן 2" 
                                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-xs text-center font-bold text-white focus:outline-none focus:border-sky-500"
                              />
                            </div>
                          </div>
                        </div>
                      ) : onlineAction === 'host' ? (
                        <div className="space-y-1.5">
                          <label className="text-[10px] text-slate-400 block font-bold">כינוי בעמוד הבית (שחקן 1):</label>
                          <input 
                            type="text" 
                            value={playerName}
                            maxLength={14}
                            onChange={(e) => {
                              setPlayerName(e.target.value);
                              setPlayer1Name(e.target.value);
                            }}
                            placeholder="הזן שמך..." 
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-center font-bold text-white focus:outline-none focus:border-sky-500"
                          />
                          <p className="text-[9px] text-slate-500 text-center leading-normal">
                            בלחיצה על "עלה לפרקט", ניצור חדר משחק עם לוח חדש שיספק קוד ייחודי למסירה לחבר.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] text-slate-400 block mb-1 font-bold">קוד חדר של החבר:</label>
                              <input 
                                type="text" 
                                value={joinRoomCodeInput}
                                maxLength={4}
                                onChange={(e) => setJoinRoomCodeInput(e.target.value.toUpperCase())}
                                placeholder="למשל: AB39" 
                                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-center font-black text-amber-300 uppercase tracking-widest focus:outline-none focus:border-sky-500"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] text-slate-400 block mb-1 font-bold font-sans">הכינוי שלכם:</label>
                              <input 
                                type="text" 
                                value={playerName}
                                maxLength={14}
                                onChange={(e) => {
                                  setPlayerName(e.target.value);
                                  setPlayer1Name(e.target.value);
                                }}
                                placeholder="שם שחקן..." 
                                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-center font-bold text-white focus:outline-none focus:border-sky-500"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                   {/* Explanatory rules segment */}
                  <div className="bg-slate-950/50 p-2.5 rounded-xl border border-slate-900 text-[10px] text-slate-400 flex items-start gap-1.5 leading-normal">
                    <Info className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                    <div>
                      {gameMode === 'daily_challenge' && 'אתגר יומי: לוח ייחודי שנקבע לכל יום! ההתקדמות נשמרת אוטומטית ברקע ותוכלו לחזור ולהמשיך בדיוק מאיפה שהפסקתם.'}
                      {gameMode === 'bot' && 'איקס עיגול נגד בוט: השלימו שלושה ברצף (טור, שורה או באלכסון) מול עודד בוט-טש האוטומטי! פספוס משאיר את המשבצת חופשית.'}
                      {gameMode === 'duo' && 'איקס עיגול מול חבר: שחקו באותו מכשיר או אונליין משני מכשירים! הראשון שמקבל שלושה בקו ישר (איקס או עיגול) מוכרז כמנצח.'}
                    </div>
                  </div>

                  {/* Collapsible Game Rules Accordion */}
                  <div className="bg-slate-950/40 rounded-xl border border-slate-850/80 overflow-hidden shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        playSound('click');
                        setShowStartScreenRules(prev => !prev);
                      }}
                      className="w-full px-3 py-2 flex items-center justify-between text-xs font-black text-amber-300 hover:bg-slate-900/40 transition-all cursor-pointer"
                    >
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-orange-400" />
                        📖 חוקי המשחק והמדריך השלם
                      </span>
                      <ChevronDown 
                        className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${
                          showStartScreenRules ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>

                    <AnimatePresence>
                      {showStartScreenRules && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-3 pb-3 pt-1 text-[11px] text-slate-300 space-y-2 border-t border-slate-900/40 font-sans leading-relaxed text-right">
                            <div className="space-y-1 bg-slate-900/30 p-2 rounded-lg border border-slate-900">
                              <span className="text-amber-400 font-bold block text-[10px]">🏀 מטרת המשחק:</span>
                              <p className="text-slate-400 text-[10px]">
                                להשלים את לוח האיקס-עיגול (3x3) על ידי מציאת שחקן כדורסל ישראלי (או זר ששיחק בליגה) שעונה על קטגוריות השורה והעמודה.
                              </p>
                            </div>

                            <div className="space-y-1 bg-slate-900/30 p-2 rounded-lg border border-slate-900">
                              <span className="text-rose-400 font-bold block text-[10px] flex items-center gap-1">
                                💖 מד הלבבות והפסילות (3 לבבות):
                              </span>
                              <p className="text-slate-400 text-[10px]">
                                אתם מתחילים עם <strong className="text-red-400 font-bold">3 לבבות (פסילות)</strong>. כל ניחוש שגוי או החלטה "להתייאש מהמשבצת" יורידו לכם לב אחד. הגעה ל-0 לבבות מסיימת את המשחק בהפסד מיידי!
                              </p>
                            </div>

                            <div className="space-y-1 bg-slate-900/30 p-2 rounded-lg border border-slate-900">
                              <span className="text-orange-400 font-bold block text-[10px]">📉 מדד נדירות (Rarity Score):</span>
                              <p className="text-slate-400 text-[10px]">
                                המטרה היא להשיג ניקוד נמוך ככל האפשר. שחקנים ייחודיים ופחות נפוצים מעניקים ניקוד נמוך יותר (קרוב ל-0 המושלם). טעות מעניקה 100+ נקודות חובה ומורידה לב!
                              </p>
                            </div>

                            <div className="space-y-1 bg-slate-900/30 p-2 rounded-lg border border-slate-900">
                              <span className="text-sky-400 font-bold block text-[10px]">🌐 חדר אונליין 1V1:</span>
                              <p className="text-slate-400 text-[10px]">
                                צרו חדר משחק, העתיקו ושתפו את הקוד הייחודי עם חבר. תוכלו לשחק בזמן אמת משני מכשירים שונים. המנצח הוא זה שישלים את הלוח עם פחות פסילות!
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex gap-2 text-xs font-sans">
                    <button
                      onClick={() => { playSound('click'); setStartStep(1); }}
                      className="w-1/3 bg-slate-850 text-slate-300 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition-all cursor-pointer"
                    >
                      ⬅️ חזור לשם
                    </button>

                    <button
                      onClick={() => {
                        if (gameMode === 'duo') {
                          if (onlineAction === 'host') {
                            handleCreateOnlineRoom();
                          } else if (onlineAction === 'join') {
                            handleJoinOnlineRoom();
                          } else {
                            setIsOnlineGame(false);
                            handleStartGame();
                          }
                        } else if (gameMode === 'daily_challenge') {
                          startDailyChallenge();
                        } else {
                          handleStartGame();
                        }
                      }}
                      className="w-2/3 bg-gradient-to-r from-orange-400 to-amber-500 text-slate-950 font-black py-2.5 rounded-xl shadow-lg shadow-orange-500/20 cursor-pointer text-center hover:from-orange-350 hover:to-amber-400 transition-all"
                    >
                      עלה לפרקט - שחק! 🏀
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}

      {/* VIEW 2: CORE IMMACULATE GAMEPLAY CONTROLLER */}
      {gameState === 'playing' && (
        <div className="flex-grow flex flex-col justify-between p-2 z-10 w-full max-w-2xl mx-auto h-full overflow-hidden relative">
          
          {/* Waiting Room Overlay if online guest is not in */}
          {isOnlineGame && onlineRoomStatus === 'waiting' && (
            <div className="absolute inset-0 bg-slate-950/95 flex flex-col items-center justify-center p-4 z-50 text-center text-slate-100">
              <div className="w-16 h-16 bg-gradient-to-tr from-sky-400 to-indigo-500 rounded-full flex items-center justify-center animate-bounce shadow-xl text-3xl mb-4">
                🌐
              </div>
              <h3 className="text-base font-black text-white">מחברים את החדר לפרקט...</h3>
              <p className="text-xs text-slate-400 max-w-xs mt-1 mb-5 leading-normal">
                שתפו את קוד החדר עם החבר שלכם כדי שיוכל להתחבר אליו ולהתחיל את הדו-קרב אונליין!
              </p>

              {/* Code box */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 w-full max-w-xs space-y-3 mb-5 shadow-2xl">
                <span className="text-[9px] text-slate-500 block uppercase font-black">קוד חדר לכניסה</span>
                <div className="text-2xl font-black text-amber-350 tracking-widest font-mono select-all">
                  {onlineRoomCode}
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(onlineRoomCode);
                      playSound('click');
                      setCopyStatus(true);
                      triggerNotification('הקוד הועתק ללוח!', 'success');
                      setTimeout(() => setCopyStatus(false), 2000);
                    }}
                    className="flex-1 bg-sky-500 hover:bg-sky-600 text-slate-950 text-[11px] font-black py-2.5 rounded-xl transition-all cursor-pointer"
                  >
                    {copyStatus ? 'הועתק! 📋' : 'העתקת קוד 📋'}
                  </button>

                  <button
                    onClick={() => {
                      const shareText = `בוא לשחק איתי איקס עיגול כדורסל ישראלי! כנס למשחק והקש קוד חדר: ${onlineRoomCode}`;
                      navigator.clipboard.writeText(shareText);
                      playSound('click');
                      triggerNotification('הודעת שיתוף הועתקה ללוח!', 'success');
                    }}
                    className="flex-1 bg-slate-800 hover:bg-slate-750 text-white text-[11px] font-bold py-2.5 rounded-xl transition cursor-pointer"
                  >
                    סגנון הודעה 🔗
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-1.5 justify-center py-2 px-3 bg-slate-900/40 rounded-lg text-[10px] text-sky-400 border border-sky-500/10">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
                <span>ממתין להצטרפות היריב... (המסך יתעדכן אוטומטית)</span>
              </div>
              
              <button
                onClick={() => {
                  playSound('click');
                  setIsOnlineGame(false);
                  setOnlineRoomCode('');
                  setOnlineRoomStatus('');
                  setGameState('start');
                }}
                className="mt-6 text-slate-400 hover:text-white text-xs underline cursor-pointer"
              >
                ביטול וחזרה לתפריט
              </button>
            </div>
          )}

          {/* Header minimal info strip */}
          <div className="flex justify-between items-center gap-2 bg-slate-900/60 border border-slate-900/80 rounded-xl px-2.5 py-1.5 shrink-0">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-orange-650 flex items-center justify-center text-xs animate-pulse">🏀</div>
              <div>
                <h2 className="text-[14px] md:text-base font-black text-amber-350 leading-tight">איקס עיגול כדורסל</h2>
                <span className="text-[10px] md:text-xs text-slate-400 uppercase font-black tracking-widest block">
                  {gameMode === 'solo' && `סולו גריד • ${soloAttemptsLeft} זריקות לסל`}
                  {gameMode === 'daily_challenge' && `אתגר יומי 📅 • ${soloAttemptsLeft} זריקות`}
                  {gameMode === 'bot' && 'קרב מול Coach Bot'}
                  {gameMode === 'duo' && (isOnlineGame ? `חדר אונליין: ${onlineRoomCode}` : 'קרב ספה מקומי 1V1')}
                </span>
              </div>
            </div>

            {/* Action headers */}
            <div className="flex items-center gap-1.5">
              {isOnlineGame && (
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(onlineRoomCode);
                    playSound('click');
                    triggerNotification('קוד חדר הועתק!', 'success');
                  }}
                  className="bg-slate-950/60 hover:bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-amber-350 font-black hover:border-amber-500 font-mono transition-all text-xs cursor-pointer"
                >
                  חדר: {onlineRoomCode} 📋
                </button>
              )}

              <button
                onClick={() => { playSound('click'); setShowRarityGuide(true); }}
                className="bg-slate-800 hover:bg-slate-750 text-[11px] md:text-xs px-2 py-1 rounded-lg text-slate-300 font-bold flex items-center gap-0.5 cursor-pointer"
              >
                עזרה
              </button>
              
              <button
                onClick={() => { playSound('click'); setGameState('start'); }}
                className="bg-red-950/20 hover:bg-red-900/40 text-[11px] md:text-xs px-2 py-1 rounded-lg text-red-400 font-bold cursor-pointer transition"
              >
                כניעה
              </button>
            </div>
          </div>

          {/* Turn states dashboard strip */}
          <div className="flex justify-between items-center bg-slate-900/60 p-2 rounded-xl border border-slate-850 shrink-0 text-xs my-0.5">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-slate-950/30 px-2 py-1 rounded-lg">
                <span className="text-[11px] font-medium text-slate-400">מהלך של:</span>
                {(gameMode === 'solo' || gameMode === 'daily_challenge') ? (
                  <span className="font-extrabold text-orange-400 flex items-center gap-1 text-[11.5px] md:text-xs">
                    <Flame className="w-3.5 h-3.5 text-orange-500 animate-bounce" />
                    {soloAttemptsLeft} מהלכים שנותרו
                  </span>
                ) : (
                  <div className="flex items-center gap-1 text-[12.5px] md:text-sm">
                    <span className={`w-2 h-2 rounded-full mr-0.5 ${currentTurn === 1 ? 'bg-sky-400 animate-ping' : 'bg-rose-500 animate-ping'}`} />
                    <span className="font-black text-white">
                      {currentTurn === 1 ? (isOnlineGame ? player1Name : playerName) : (gameMode === 'bot' ? 'עודד בוט-טש' : player2Name)}
                    </span>
                  </div>
                )}
              </div>

              {/* 30s Shot clock timer */}
              {(gameMode === 'bot' || gameMode === 'duo') && (
                <div className="flex items-center gap-1 bg-slate-950/40 border border-slate-800/80 px-2 py-1 rounded-lg">
                  <span className="text-[10px] font-black text-slate-400">⏱️:</span>
                  <span className={`font-mono text-[13px] font-black leading-none ${
                    timeLeft <= 7 ? 'text-red-500 animate-pulse drop-shadow-[0_0_4px_rgba(239,68,68,0.8)]' : 'text-orange-450'
                  }`}>
                    {timeLeft.toString().padStart(2, '0')} ש'
                  </span>
                </div>
              )}
            </div>

            {/* Score Indicators */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] md:text-xs text-slate-400 block leading-tight">מדד ({isOnlineGame ? player1Name : playerName})</span>
                <span className="font-mono text-sm md:text-base font-black text-sky-400 leading-none">{rarityScores.p1}</span>
              </div>

              {(gameMode !== 'solo' && gameMode !== 'daily_challenge') && (
                <div className="text-right border-r border-slate-850 pr-2.5">
                  <span className="text-[10px] md:text-xs text-slate-400 block leading-tight">{gameMode === 'bot' ? 'עודד בוט' : player2Name}</span>
                  <span className="font-mono text-sm md:text-base font-black text-rose-450 leading-none">{rarityScores.p2}</span>
                </div>
              )}
            </div>
          </div>

          {/* Hearts / Lives indicator block */}
          <div className="flex justify-between items-center bg-slate-900/60 px-3 py-1.5 rounded-xl border border-slate-850 shrink-0 text-xs my-0.5">
            {(gameMode === 'solo' || gameMode === 'daily_challenge') ? (
              <div className="flex items-center gap-2 justify-between w-full">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-slate-300">לבבות (פסילות שנותרו):</span>
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: 3 }).map((_, idx) => (
                      <span 
                        key={idx} 
                        className={`text-sm transition-all duration-300 transform ${
                          idx < p1Lives 
                            ? 'scale-110 opacity-100 text-red-500 drop-shadow-[0_0_4px_rgba(239,68,68,0.75)] animate-pulse' 
                            : 'scale-90 opacity-20 grayscale text-slate-600 font-bold'
                        }`}
                      >
                        {idx < p1Lives ? '❤️' : '🖤'}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">3 פסילות והמשחק נגמר! 🚫</span>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full">
                {/* Player 1 Lives */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[10.5px] font-bold text-slate-300 truncate max-w-[85px]">
                    {isOnlineGame ? player1Name : playerName}:
                  </span>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 3 }).map((_, idx) => (
                      <span 
                        key={idx} 
                        className={`text-xs transition-all duration-300 ${
                          idx < p1Lives 
                            ? 'scale-110 opacity-100 text-red-500 drop-shadow-[0_0_3px_rgba(239,68,68,0.7)]' 
                            : 'scale-90 opacity-20 grayscale text-slate-600 font-bold'
                        }`}
                      >
                        {idx < p1Lives ? '❤️' : '🖤'}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Badge middle */}
                <span className="text-[9.5px] font-black uppercase tracking-wider text-slate-400 bg-slate-950/40 px-2 py-0.5 rounded border border-slate-850/80">
                  דו-קרב פסילות 🥊
                </span>

                {/* Player 2 Lives */}
                <div className="flex items-center gap-1.5 text-left">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 3 }).map((_, idx) => (
                      <span 
                        key={idx} 
                        className={`text-xs transition-all duration-300 ${
                          idx < p2Lives 
                            ? 'scale-110 opacity-100 text-red-500 drop-shadow-[0_0_3px_rgba(239,68,68,0.7)]' 
                            : 'scale-90 opacity-20 grayscale text-slate-600 font-bold'
                        }`}
                      >
                        {idx < p2Lives ? '❤️' : '🖤'}
                      </span>
                    ))}
                  </div>
                  <span className="text-[10.5px] font-bold text-slate-300 truncate max-w-[85px]">
                    :{gameMode === 'bot' ? 'עודד בוט' : player2Name}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Bot action visual strip */}
          {botThinking && (
            <div className="bg-amber-950/35 border border-amber-500/20 text-amber-350 text-[10px] py-1.5 rounded-lg text-center flex items-center justify-center gap-1.5 animate-pulse shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" />
              <span>המאמן הווירטואלי עודד בוט-טש משרטט מהלך כבוש...</span>
            </div>
          )}

          {/* Core IMMACULATE PLAY GRID - Fitting perfectly on any desktop or mobile viewport height constraints */}
          <div className="flex-grow flex items-center justify-center my-0.5 overflow-hidden">
            <div className="w-full max-w-[380px] aspect-square grid grid-cols-4 grid-rows-4 gap-1 md:gap-1.5">
              
              {/* Corner logo */}
              <div className="col-span-1 row-span-1 bg-slate-900/40 rounded-xl border border-slate-900/85 flex items-center justify-center select-none">
                <span className="text-sm">🏀</span>
              </div>

              {/* Top columns categories */}
              {cols.map((col, idx) => (
                <div 
                  key={`col-${idx}`}
                  title={col.description}
                  className={`col-span-1 rounded-xl flex flex-col items-center justify-center p-1 text-center shadow relative ${col.colorClass} min-h-0 min-w-0`}
                >
                  <span className="text-xs md:text-sm block" role="img" aria-label={col.label}>{col.icon}</span>
                  <span className="text-[11px] md:text-[13px] font-black leading-tight text-slate-100 tracking-tight">
                    {col.label}
                  </span>
                </div>
              ))}

              {/* Interlaced Row category and interactive cells */}
              {[0, 1, 2].map((rIdx) => {
                const rHeader = rows[rIdx];
                return (
                  <React.Fragment key={`row-fr-${rIdx}`}>
                    {/* Left side row header */}
                    <div 
                      title={rHeader?.description}
                      className={`col-span-1 rounded-xl flex flex-col items-center justify-center p-1 text-center shadow ${rHeader?.colorClass} min-h-0 min-w-0`}
                    >
                      <span className="text-xs md:text-sm block" role="img" aria-label={rHeader?.label}>{rHeader?.icon}</span>
                      <span className="text-[11px] md:text-[13px] font-black leading-tight text-slate-100 tracking-tight">
                        {rHeader?.label}
                      </span>
                    </div>

                    {/* Left adjacent cell interactive nodes */}
                    {[0, 1, 2].map((cIdx) => {
                      const answer = answers[rIdx][cIdx];
                      const isClaimed = answer !== null;

                      return (
                        <div
                          key={`play-cell-${rIdx}-${cIdx}`}
                          onClick={() => handleCellClick(rIdx, cIdx)}
                          className={`col-span-1 rounded-xl transition-all flex flex-col items-center justify-center p-0.5 text-center select-none overflow-hidden relative ${getCellClassName(rIdx, cIdx)}`}
                        >
                          {/* Relative X / O symbol marker badge for Tic-Tac-Toe */}
                          {(gameMode === 'bot' || gameMode === 'duo') && answer && answer !== 'incorrect' && (
                            <span className={`absolute top-1 right-1 text-[8px] font-black px-1.5 py-0.5 rounded leading-none select-none ${
                              answeredBy[rIdx][cIdx] === 1 
                                ? 'bg-sky-400 text-slate-950 shadow-[0_0_4px_rgba(56,189,248,0.5)]' 
                                : 'bg-rose-400 text-slate-950 shadow-[0_0_4px_rgba(251,113,133,0.5)]'
                            }`}>
                              {answeredBy[rIdx][cIdx] === 1 ? 'X' : 'O'}
                            </span>
                          )}

                          {!isClaimed ? (
                            <span className="text-[11px] md:text-xs text-slate-400 font-extrabold">בחרו</span>
                          ) : answer === 'incorrect' ? (
                            <div className="flex flex-col items-center">
                              <span className="text-[11.5px] md:text-xs font-black text-red-400">החטאה 🚫</span>
                              <span className="text-[9px] text-red-350 font-mono font-bold">+100</span>
                            </div>
                          ) : (
                            <div className="flex flex-col justify-between h-full w-full py-1">
                              {/* DISPLAY PLAYER NAME WITH ABSOLUTELY NO EXTRA TEAM DETAILS TO SPOIL TRIVIA CHECKS */}
                              <span className="text-[11px] md:text-[12.5px] font-extrabold text-white leading-tight block truncate text-center w-full">
                                {answer.name}
                              </span>
                              
                              <div className="mt-0.5">
                                <span className="text-[9px] bg-slate-950/65 px-1 py-0.2 rounded text-amber-300 font-mono font-black">
                                  {answer.popularity}%
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </React.Fragment>
                );
              })}

            </div>
          </div>

          {/* Bottom inline tips bar */}
          <div className="text-[11px] text-slate-400 bg-slate-900/15 p-2 rounded-lg border border-slate-900 text-center shrink-0">
            <span>המטרה: לבחור שחקנים כמה שיותר ייחודיים כדי לזכות באחוז נמוך.</span>
          </div>

        </div>
      )}

      {/* VIEW 3: DYNAMIC GAME OVER REPORT */}
      {gameState === 'gameover' && (
        <div className="flex-grow flex items-center justify-center p-3 z-10 w-full max-w-sm mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full bg-slate-900/95 border border-amber-500 rounded-2xl p-5 shadow-2xl text-center"
          >
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-2 text-slate-950 font-bold text-lg shadow-lg">
              🏆
            </div>

            <h2 className="text-xl font-black text-white">המשחק הסתיים!</h2>
            <p className="text-xs md:text-sm text-slate-400 mb-3">דוברי הכדורסל של הליגה קבעו:</p>

            {/* Score report card */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 mb-4 text-center">
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="border-r border-slate-850">
                  <span className="text-[11px] md:text-xs text-slate-300 font-bold block leading-none">{playerName}</span>
                  <span className="text-3xl font-black text-sky-400 font-mono block my-1">
                    {rarityScores.p1}
                  </span>
                  <span className="text-[10px] text-slate-400 block pb-1">מדד נדירות</span>
                </div>

                <div>
                  <span className="text-[11px] md:text-xs text-slate-300 font-bold block leading-none">
                    {(gameMode === 'solo' || gameMode === 'daily_challenge') ? 'נותרו חופשיים' : `${gameMode === 'bot' ? 'הבוט' : player2Name}`}
                  </span>
                  <span className="text-3xl font-black text-rose-400 font-mono block my-1">
                    {(gameMode === 'solo' || gameMode === 'daily_challenge') ? soloAttemptsLeft : rarityScores.p2}
                  </span>
                  <span className="text-[10px] text-slate-400 block pb-1">
                    {(gameMode === 'solo' || gameMode === 'daily_challenge') ? 'זריקות לסל' : 'מדד נדירות'}
                  </span>
                </div>
              </div>

              {/* Inline feedback details */}
              <div className="mt-2.5 pt-2 border-t border-slate-900 text-xs md:text-sm font-bold text-amber-300">
                {(gameMode === 'solo' || gameMode === 'daily_challenge') && (rarityScores.p1 < 320 ? 'מוח כדורסל מבריק! אתה מקצוען!' : 'לוח שלם ומכובד! נראה אם תצליח להשיג ניקוד נמוך יותר!')}
                {(gameMode === 'bot' || gameMode === 'duo') && tttResultFeedback}
              </div>
            </div>

            {/* Minimap Review wrapper */}
            <div className="grid grid-cols-3 gap-1 max-w-[120px] mx-auto mb-4">
              {answers.flat().map((cell, idx) => (
                <div 
                  key={`minimap-${idx}`}
                  className={`w-4 h-4 rounded-sm ${
                    cell === null 
                      ? 'bg-slate-800' 
                      : cell === 'incorrect' 
                        ? 'bg-red-500/20 border border-red-500' 
                        : 'bg-emerald-500/20 border border-emerald-500'
                  }`}
                />
              ))}
            </div>

            {/* Action buttons */}
            <div className="space-y-2">
              {answers.flat().includes('incorrect') && (
                <button
                  type="button"
                  onClick={() => {
                    playSound('click');
                    setIsCorrectionMode(true);
                    setGameState('playing');
                    setP1Lives(3);
                    setP2Lives(3);
                    setSoloAttemptsLeft(prev => Math.max(prev, 5));
                    triggerNotification('מצב תיקון שגיאות פעיל! לחץ על משבצת אדומה כדי לנסות שנית.', 'success');
                  }}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs md:text-sm font-black py-2.5 rounded-xl transition pointer-events-auto cursor-pointer flex items-center justify-center gap-1.5 shadow"
                >
                  🎯 חזור ותקן את הטעויות שלי!
                </button>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => { playSound('click'); setGameState('start'); }}
                  className="w-1/2 bg-slate-800 hover:bg-slate-750 text-xs md:text-sm font-black py-2.5 rounded-xl transition text-slate-350 pointer-events-auto cursor-pointer"
                >
                  חזרה לתפריט
                </button>
                
                <button
                  onClick={() => {
                    playSound('click');
                    if (isOnlineGame) {
                      handleRematchOnline();
                    } else {
                      handleStartGame();
                    }
                  }}
                  className="w-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 text-xs md:text-sm font-black py-2.5 rounded-xl transition pointer-events-auto cursor-pointer"
                >
                  {isOnlineGame ? 'סיבוב נוסף 🔁' : 'משחק חדש'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* 4. MODAL DRAWER: SEARCH FOR PLAYER OVERLAY PANEL */}
      <AnimatePresence>
        {activeCell && (
          <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-3 text-right text-slate-100">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border-2 border-orange-500 rounded-2xl max-w-sm w-full p-4 shadow-2xl flex flex-col max-h-[85vh] relative"
            >
              {/* Top row */}
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-[10px] font-black text-amber-300 uppercase bg-slate-950 px-2 py-0.5 rounded">
                  בחרו שחקן סחיק
                </span>
                
                <button 
                  onClick={() => { playSound('click'); setActiveCell(null); }}
                  className="text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Categories intersection */}
              <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-850 mb-3 text-center">
                <span className="text-[9px] text-slate-400 block mb-0.5">יש למלא שחקן שעונה על:</span>
                <div className="flex items-center justify-center gap-1.5 text-[11px] font-black">
                  <span className="text-sky-300">{cols[activeCell.c]?.label}</span>
                  <span className="text-slate-500">&amp;</span>
                  <span className="text-rose-400">{rows[activeCell.r]?.label}</span>
                </div>
              </div>

              {/* TextInput search box */}
              <div className="relative mb-2.5">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="הזינו שם שחקן (דני אבדיה, כספי, פארקר...)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 pl-8 text-xs text-white focus:outline-none focus:ring-1 focus:ring-orange-500 font-bold text-right"
                />
                
                <div className="absolute inset-y-0 left-3 flex items-center bg-transparent pointer-events-none text-slate-500">
                  <Search className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Search list results - ONLY SHOWS PLAYER NAMES AS STRICT RULE */}
              <div className="flex-grow overflow-y-auto custom-scroll space-y-1 mb-3.5 max-h-[200px]">
                {filteredPlayers.length > 0 ? (
                  filteredPlayers.map((player) => (
                    <button
                      key={player.id}
                      onClick={() => handleSelectPlayer(player)}
                      className="w-full text-right bg-slate-950/70 hover:bg-slate-800 border border-slate-800 rounded-lg p-2 flex justify-between items-center transition cursor-pointer text-slate-100"
                    >
                      {/* STRICT ACCORDING TO USER: ONLY THE NAME - NO TEAMS OR TRANSFER HISTORY REVEALED */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black">{player.name}</span>
                        <span className="text-[8px] bg-slate-900 border border-slate-850 px-1 py-0.2 rounded text-slate-400">
                          {player.isForeign ? 'זר ✈️' : 'ישראלי 🕎'}
                        </span>
                      </div>

                      <div className="text-left font-mono">
                        <span className="text-[7.5px] text-slate-500 block leading-none">פופולריות</span>
                        <span className="text-xs font-black text-amber-300 leading-none">
                          {player.popularity}%
                        </span>
                      </div>
                    </button>
                  ))
                ) : (
                  <p className="text-center text-slate-500 text-[10px] py-10 leading-relaxed font-medium">
                    {searchQuery.trim().length < 2 
                      ? 'הקלידו לפחות שתי אותיות לחיפוש (למשל: כספי, גל מקל, פארקר, ברקוביץ\', אבדיה...)' 
                      : 'שחקן זה לא נמצא במאגר. נסו שחקן אחר מהליגה.'}
                  </p>
                )}
              </div>

              {/* Modal controls footer */}
              <div className="flex gap-2 justify-end text-[11px]">
                <button
                  onClick={handleGiveUpCell}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-350 px-3 py-1.5 rounded-lg font-bold transition cursor-pointer"
                >
                  ויתור / אין מענה (+100)
                </button>
                
                <button
                  onClick={() => { playSound('click'); setActiveCell(null); }}
                  className="bg-red-950/50 hover:bg-red-900/50 text-red-405 px-3 py-1.5 rounded-lg font-bold transition cursor-pointer"
                >
                  סגור
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. MODAL GUIDE PANEL */}
      <AnimatePresence>
        {showRarityGuide && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 select-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-4 shadow-2xl text-right"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-orange-400" />
                  <h3 className="text-xs font-black text-white">הנחיות למשחק וניקוד</h3>
                </div>
                
                <button 
                  onClick={() => { playSound('click'); setShowRarityGuide(false); }}
                  className="text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-[11px] text-slate-300 leading-relaxed mb-4">
                <p>
                  1. עליכם לבחור עבור כל תא במשבצת 3x3 שחקן כדורסל (פעיל או היסטורי) ששיחק <strong>בשתי הקטגוריות המצטלבות</strong> (השורה והעמודה).
                </p>
                <p>
                  2. <strong>מדד נדירות (Rarity Score):</strong> לכל שחקן מעודכן ציון שנע בין 1 ל-100 המצביע על פופולריות הבחירה שלו. עליכם לנסות למצוא שחקנים כמה שיותר "נדירים" כדי לסיים את הגריד עם <strong>הציון הנמוך ביותר</strong>!
                </p>
                <p>
                  3. במצב סולו, תקבלו 9 ניסיונות סך הכל. במצב בוט או דו-קרב, כל בחירה עוברת לתור הבא במהירות, ללא מגבלת פסילות.
                </p>
                <p className="text-amber-400 font-black">
                  הצלחה = נקודות לפי הנדירות. פספוס או מעבר = 100 נקודות.
                </p>
              </div>

              <button
                onClick={() => { playSound('click'); setShowRarityGuide(false); }}
                className="w-full bg-orange-500 hover:bg-orange-600 text-slate-950 font-black py-2 rounded-xl transition text-xs"
              >
                סגרו מדריך והמשיכו!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Humanized responsive footer inside visual boundaries */}
      <footer className="py-2 text-center border-t border-slate-900/40 bg-slate-950/60 z-10 text-[8.5px] text-slate-500 shrink-0">
        <span>כל הזכויות שמורות לאיתן קאופמן © {new Date().getFullYear()} • איקס עיגול כדורסל ישראלי</span>
      </footer>

    </div>
  );
}
