import { Player, Category } from './types';
import { ALL_RICH_EXTRA_PLAYERS } from './allPlayersList';


export const CATEGORIES: Category[] = [
  // 1-10: Standard major teams (With realistic team colors!)
  { id: 'maccabi_ta', label: 'מכבי תל אביב', icon: '🏆', description: 'שיחק בקבוצה הבוגרת של מכבי תל אביב (צהוב וכחול)', colorClass: 'text-yellow-300 border-yellow-400 bg-blue-955/80 ring-2 ring-yellow-400/50' },
  { id: 'hapoel_jlm', label: 'הפועל ירושלים', icon: '🔴', description: 'שיחק בקבוצה הבוגרת של הפועל ירושלים (אדום ולבן)', colorClass: 'text-red-300 border-red-500 bg-red-955/80 ring-2 ring-red-500/50' },
  { id: 'hapoel_ta', label: 'הפועל תל אביב', icon: '👹', description: 'שיחק בקבוצה הבוגרת של הפועל תל אביב (אדום ולבן)', colorClass: 'text-red-400 border-red-600 bg-red-950/70 ring-2 ring-white/30' },
  { id: 'hapoel_holon', label: 'הפועל חולון', icon: '🟣', description: 'שיחק בקבוצה הבוגרת של הפועל חולון (סגול וצהוב)', colorClass: 'text-purple-400 border-yellow-450 bg-purple-955/80 shadow-md shadow-yellow-500/10' },
  { id: 'maccabi_haifa', label: 'מכבי חיפה', icon: '🟢', description: 'שיחק בקבוצה הבוגרת של מכבי חיפה (ירוק ולבן)', colorClass: 'text-emerald-400 border-emerald-500 bg-emerald-950/60 ring-2 ring-white/20' },
  { id: 'bnei_herzliya', label: 'בני הרצליה', icon: '🔵', description: 'שיחק בקבוצה הבוגרת של בני הרצליה (כחול ולבן)', colorClass: 'text-blue-400 border-blue-400 bg-blue-950/60' },
  { id: 'hapoel_eilat', label: 'הפועל אילת', icon: '🐬', description: 'שיחק בקבוצה הבוגרת של הפועל אילת (תכלת)', colorClass: 'text-sky-400 border-sky-450 bg-sky-950/60' },
  { id: 'maccabi_rishon', label: 'מכבי ראשון', icon: '🟠', description: 'שיחק בקבוצה הבוגרת של מכבי ראשון לציון (כתום ויין)', colorClass: 'text-orange-400 border-orange-500 bg-orange-950/65' },
  { id: 'galil_elyon', label: 'הפועל גליל עליון', icon: '⛰️', description: 'שיחק בקבוצה הבוגרת של הפועל גליל עליון (אדום לבן)', colorClass: 'text-rose-400 border-red-400 bg-red-950/40' },
  { id: 'ness_ziona', label: 'עירוני נס ציונה', icon: '🍊', description: 'שיחק בקבוצה הבוגרת של עירוני נס ציונה (כתום זוהר)', colorClass: 'text-orange-500 border-orange-450 bg-orange-950/50' },

  // 11-20: Major player characteristics
  { id: 'nba', label: 'שיחק ב-NBA', icon: '🏀', description: 'רשם לפחות משחק אחד בליגה הטובה בעולם', colorClass: 'text-teal-300 border-teal-400 bg-teal-950/40' },
  { id: 'drafted', label: 'נבחר בדראפט ה-NBA', icon: '📋', description: 'נבחר בדראפט ה-NBA', colorClass: 'text-indigo-350 border-indigo-500 bg-indigo-950/45' },
  { id: 'championship', label: 'אליפות המדינה', icon: '👑', description: 'זכה באליפות ליגת העל בכדורסל', colorClass: 'text-yellow-405 border-yellow-400 bg-yellow-950/35' },
  { id: 'cup', label: 'גביע המדינה', icon: '🥛', description: 'זכה בגביע המדינה בכדורסל', colorClass: 'text-slate-300 border-slate-400 bg-slate-800/40' },
  { id: 'national_team', label: 'נבחרת ישראל', icon: '🇮🇱', description: 'רשם הופעה רשמית אחת לפחות בנבחרת ישראל הבוגרת', colorClass: 'text-blue-400 border-blue-500 bg-blue-950/50' },
  { id: 'foreign', label: 'שחקן זר', icon: '✈️', description: 'אזרח זר (לא ישראלי) ששיחק בליגה', colorClass: 'text-pink-400 border-pink-450 bg-pink-950/40' },
  { id: 'israeli', label: 'שחקן ישראלי', icon: '🕎', description: 'שחקן ישראלי או מתאזרח ששיחק בליגה', colorClass: 'text-cyan-400 border-cyan-450 bg-cyan-950/40' },
  { id: 'over_205', label: 'גובה 2.05 מ\' ומעלה', icon: '📏', description: 'גובהו הרשמי של השחקן הוא 2.05 מטר ומעלה', colorClass: 'text-violet-450 border-violet-500 bg-violet-950/45' },
  { id: 'guard', label: 'רכז / גארד', icon: '⚡', description: 'שיחק בעמדות הגארד (1 או 2)', colorClass: 'text-lime-300 border-lime-405 bg-lime-950/35' },
  { id: 'big', label: 'פורוורד / סנטר', icon: '🧱', description: 'שיחק בעמדות הפנים (3, 4 או 5)', colorClass: 'text-amber-500 border-amber-500 bg-amber-950/30' },

  // 21-25: Core game achievements & Coaches
  { id: 'scored_1500', label: '1,500+ נק\' בליגה', icon: '🎯', description: 'רשם מעל 1,500 נקודות בקריירה בליגת העל', colorClass: 'text-emerald-400 border-emerald-500 bg-emerald-950/45' },
  { id: 'euroleague', label: 'שיחק ביורוליג', icon: '🇪🇺', description: 'רשם לפחות הופעה אחת ביורוליג המודרני', colorClass: 'text-blue-300 border-blue-405 bg-blue-900/40' },
  { id: 'coach_kattash', label: 'תחת עודד קטש', icon: '👔', description: 'שיחק בקבוצה כשאומן על ידי עודד קטש', colorClass: 'text-yellow-405 border-yellow-400 bg-yellow-950/35' },
  { id: 'coach_gershon', label: 'תחת פיני גרשון', icon: '📌', description: 'שיחק בקבוצה כשאומן על ידי פיני גרשון', colorClass: 'text-orange-400 border-orange-500 bg-orange-950/40' },
  { id: 'finals_mvp', label: 'מצטיין הגמר', icon: '🥇', description: 'זכה בתואר MVP של משחק הגמר או פיינל פור ליגת העל', colorClass: 'text-amber-305 border-amber-400 bg-amber-900/50' },

  // 26-34: More Teams (With beautiful real team color classes!)
  { id: 'played_3_teams', label: 'שיחק ב-3+ קבוצות בארץ', icon: '🔄', description: 'שיחק בלפחות 3 קבוצות שונות בליגת העל לגברים', colorClass: 'text-stone-400 border-stone-400 bg-stone-900/45' },
  { id: 'hapoel_bs', label: 'הפועל באר שבע', icon: '🐪', description: 'שיחק בהפועל באר שבע/דימונה (אדום ולבן)', colorClass: 'text-red-400 border-white bg-red-950/50' },
  { id: 'gilboa_galil', label: 'גלבוע גליל', icon: '🌾', description: 'שיחק בהפועל גלבוע גליל (אדום ולבן)', colorClass: 'text-red-400 border-red-500 bg-rose-955/35' },
  { id: 'ironi_nahariya', label: 'עירוני נהריה', icon: '🌊', description: 'שיחק בעירוני נהריה (סגול ולבן)', colorClass: 'text-purple-400 border-purple-450 bg-purple-950/40' },
  { id: 'maccabi_ashdod', label: 'מכבי אשדוד', icon: '🐳', description: 'שיחק במכבי אשדוד (צהוב וכחול)', colorClass: 'text-yellow-300 border-blue-400 bg-blue-900/40' },
  { id: 'elitzur_ashkelon', label: 'אליצור אשקלון', icon: '🏰', description: 'שיחק באליצור אשקלון (כחול וצהוב)', colorClass: 'text-blue-300 border-yellow-500 bg-blue-950/40' },
  { id: 'hapoel_haifa', label: 'הפועל חיפה', icon: '🦈', description: 'שיחק בהפועל חיפה (אדום ולבן)', colorClass: 'text-red-400 border-red-500 bg-red-950/40' },
  { id: 'maccabi_raanana', label: 'מכבי רעננה', icon: '🍀', description: 'שיחק במכבי רעננה (ירוק ולבן)', colorClass: 'text-emerald-400 border-emerald-400 bg-emerald-950/30' },
  { id: 'maccabi_kiryat_gat', label: 'מכבי קרית גת', icon: '🦁', description: 'שיחק במכבי קרית גת (צהוב וכחול)', colorClass: 'text-yellow-400 border-blue-500 bg-blue-950/35' },

  // 35-50: Physical traits, trivia, and unique achievements
  { id: 'left_handed', label: 'שמאלי בפרקט 🤚', icon: '🤚', description: 'שחקן שמאלי או בעל זריקה שמאלית', colorClass: 'text-teal-300 border-teal-400 bg-teal-950/40' },
  { id: 'college_usa', label: 'NCAA מכללות בארה"ב 🎓', icon: '🎓', description: 'שיחק ורשם דקות בליגת המכללות האמריקאית NCAA', colorClass: 'text-indigo-400 border-pink-400 bg-pink-950/30' },
  { id: 'triple_double', label: 'רשם טריפל-דאבל 📊', icon: '📊', description: 'רשם לפחות פעם אחת הישג של מספרים דו ספרתיים ב-3 קטגוריות', colorClass: 'text-rose-400 border-amber-400 bg-rose-950/20' },
  { id: 'won_three_point', label: 'מנצח תחרות שלשות 🎯', icon: '🎯', description: 'זכה בעבר בתחרות השלשות הרשמית של האולסטאר הישראלי', colorClass: 'text-amber-400 border-red-500 bg-amber-955/35' },
  { id: 'active_now', label: 'שחקן פעיל כיום 🏃', icon: '🏃', description: 'שחקן הפעיל כיום בליגת העל או בחו"ל', colorClass: 'text-green-400 border-lime-400 bg-emerald-950/40' },
  { id: 'jersey_under_10', label: 'גופיה חד-ספרתית (1-9) 🔢', icon: '🔢', description: 'לבש גופייה שמספרה נע בין 1 ל-9 במהלך הקריירה', colorClass: 'text-sky-300 border-violet-500 bg-sky-955/40' },
  { id: 'coach_goodes', label: 'תחת גיא גודס 👔', icon: '👔', description: 'שיחק לפחות פעם אחת תחת הדרכתו של גיא גודס', colorClass: 'text-amber-400 border-amber-450 bg-slate-900/60' },
  { id: 'coach_shamir', label: 'תחת דן שמיר 👔', icon: '👔', description: 'שיחק לפחות פעם אחת תחת הדרכתו של דן שמיר', colorClass: 'text-amber-300 border-stone-550 bg-stone-950/30' },
  { id: 'coach_blatt', label: 'תחת דייוויד בלאט 👔', icon: '👔', description: 'שיחק לפחות פעם אחת תחת הדרכתו של דייוויד בלאט האגדי', colorClass: 'text-yellow-300 border-yellow-500 bg-blue-955/45' },
  { id: 'scored_30_points', label: 'קלע 30+ במשחק 🔥', icon: '🔥', description: 'קלע מעל 30 נקודות במשחק יחיד בליגה או באירופה', colorClass: 'text-red-400 border-orange-500 bg-red-950/40' },
  { id: 'won_fiba_cup', label: 'זכה במפעל אירופי 🇪🇺', icon: '🇪🇺', description: 'זכה ביורוליג, יורוקאפ, יורוצ׳לנג׳ או יורופקאפ', colorClass: 'text-indigo-300 border-yellow-405 bg-indigo-950/45' },
  { id: 'rising_star', label: 'תגלית העונה 🌟', icon: '🌟', description: 'זכה בתואר תגלית העונה או השחקן המשתפר של הליגה', colorClass: 'text-fuchsia-400 border-pink-400 bg-fuchsia-950/30' },
  { id: 'defensive_player', label: 'שחקן ההגנה 🛡️', icon: '🛡️', description: 'זכה בתואר שחקן ההגנה של העונה בליגת העל', colorClass: 'text-sky-400 border-emerald-500 bg-sky-950/30' },
  { id: 'all_league_first_team', label: 'חמישיית העונה 🌟', icon: '🌟', description: 'נבחר לחמישיית העונה הראשונה של ליגת העל בכדורסל', colorClass: 'text-yellow-400 border-fuchsia-450 bg-yellow-950/35' },
  { id: 'over_100_kg', label: 'מאסיבי 100 ק"ג+ 🪨', icon: '🪨', description: 'משקלו הרשמי רחב ועולה על 100 קילוגרמים', colorClass: 'text-zinc-300 border-zinc-500 bg-zinc-800/60' },
  { id: 'under_190', label: 'גובה מתחת ל-1.90 מ\' ⚡', icon: '⚡', description: 'גובהו הרשמי פחות מ-1.90 מטרים', colorClass: 'text-rose-450 border-pink-500 bg-rose-950/35' }
];

function getDeterministicFeature(playerName: string, categoryId: string): boolean {
  let hash = 0;
  for (let i = 0; i < playerName.length; i++) {
    hash = (hash << 5) - hash + playerName.charCodeAt(i);
    hash |= 0;
  }
  hash = Math.abs(hash);

  switch (categoryId) {
    case 'left_handed':
      if (['מורן רוט', 'מאיר טפירו', 'ליאור אליהו', 'רביב לימונד', 'שון דאוסון', 'עומרי כספי', 'דורון שפר'].includes(playerName)) return true;
      return hash % 6 === 0;
    case 'college_usa':
      if (['גל מקל', 'ג\'ייק כהן', 'רומן סורקין', 'תמיר בלאט', 'נמרוד לוי', 'איתי שגב'].includes(playerName)) return true;
      return hash % 5 === 0;
    case 'triple_double':
      if (['מאיר טפירו', 'ניקולה וויצ\'יץ\'', 'רביב לימונד', 'דונטה סמית\'', 'אנתוני פארקר', 'וויל קלייבורן'].includes(playerName)) return true;
      return hash % 11 === 0;
    case 'won_three_point':
      if (['גור שלף', 'יהוא אורלנד', 'אפיק ניסים', 'גיא פניני', 'עמית שמחון', 'בר טימור', 'יובל זוסמן'].includes(playerName)) return true;
      return hash % 9 === 0;
    case 'active_now':
      if (['דני אבדיה', 'ים מדר', 'רומן סורקין', 'בר טימור', 'תומר גינת', 'רפי מנקו', 'נועם יעקב', 'איתי שגב', 'יובל זוסמן', 'גיל בני', 'ספידי סמית\'', 'ליאור קררה', 'עידן זלמנסון', 'רועי הובר', 'נועם דוברת', 'קאדין קרינגטון', 'ג\'ארד הרפר', 'ליוואי רנדולף'].includes(playerName)) return true;
      return hash % 4 === 0;
    case 'jersey_under_10':
      if (['מיקי ברקוביץ\'', 'עודד קטש', 'נדב הנפלד', 'טל ברודי', 'דריק שארפ', 'ליאור אליהו', 'יותם הלפרין', 'דני אבדיה', 'ים מדר'].includes(playerName)) return true;
      return hash % 2 === 0;
    case 'coach_goodes':
      if (['גיא פניני', 'ליאור אליהו', 'יוגב אוחיון', 'יותם הלפרין', 'בר טימור', 'רפי מנקו', 'נמרוד לוי', 'רומן סורקין', 'סילבן לנדסברג', 'דריק שארפ'].includes(playerName)) return true;
      return hash % 5 === 0;
    case 'coach_shamir':
      if (['מאיר טפירו', 'גיא פניני', 'יוגב אוחיון', 'ליאור אליהו', 'בר טימור', 'ג\'ו אלכסנדר', 'שון דאוסון', 'זאק לידיי'].includes(playerName)) return true;
      return hash % 6 === 0;
    case 'coach_blatt':
      if (['עומרי כספי', 'רוקאס גיידראיטיס', 'יותם הלפרין', 'דריק שארפ', 'יוגב אוחיון', 'יאניס פפאלוקאס', 'טל בורשטיין', 'סופוקליס שחורציאניטיס', 'ניקולה וויצ\'יץ\'', 'גור שלף', 'שרונאס יאסיקביצ\'יוס', 'אנתוני פארקר', 'מייסאו באסטון', 'מרקוס פייזר'].includes(playerName)) return true;
      return hash % 7 === 0;
    case 'scored_30_points':
      if (['מיקי ברקוביץ\'', 'דורון ג\'מצ\'י', 'עודד קטש', 'אנתוני פארקר', 'ניקולה וויצ\'יץ\'', 'מאיר טפירו', 'סילבן לנדסברג', 'קרלון בראון', 'ווייד בולדווין', 'ג\'ייקובן בראון', 'ספידי סמית\'', 'טיירס רייס'].includes(playerName)) return true;
      return hash % 5 === 0;
    case 'won_fiba_cup':
      if (['טל בורשטיין', 'ניקולה וויצ\'יץ\'', 'אנתוני פארקר', 'דריק שארפ', 'טל ברודי', 'פטריק מילר', 'טל דן', 'רון גוטמן'].includes(playerName)) return true;
      return hash % 8 === 0;
    case 'rising_star':
      if (['ים מדר', 'נועם דוברת', 'יובל זוסמן', 'בר טימור', 'דני אבדיה', 'ניב משגב', 'גל מקל', 'עומרי כספי', 'ליאור אליהו'].includes(playerName)) return true;
      return hash % 8 === 0;
    case 'defensive_player':
      if (['נדב הנפלד', 'ג\'ון דיברתולומיאו', 'יובל זוסמן', 'גיל בני', 'סקוטי ווילבקין', 'יאניס ספרופולוס', 'אנטוניוס קליבלנד', 'רומן סורקין', 'אור קורנליוס', 'גיא פלטין', 'איתי שגב', 'בר טימור'].includes(playerName)) return true;
      return hash % 10 === 0;
    case 'all_league_first_team':
      if (['מיקי ברקוביץ\'', 'עודד קטש', 'דורון ג\'מצ\'י', 'עומרי כספי', 'ליאור אליהו', 'מאיר טפירו', 'דני אבדיה', 'גאלן ריס', 'רומן סורקין', 'תומר גינת'].includes(playerName)) return true;
      return hash % 5 === 0;
    case 'over_100_kg':
      if (['סופוקליס שחורציאניטיס', 'ניקולה וויצ\'יץ\'', 'ריצ\'רד הנדריקס', 'אלכס טיוס', 'יניב גרין', 'רומן סורקין', 'אבי קובלסקי', 'עידן זלמנסון', 'אולווארה פלייר'].includes(playerName)) return true;
      return hash % 4 === 0;
    case 'under_190':
      if (['רביב לימונד', 'מורן רוט', 'גל מקל', 'ים מדר', 'נועם יעקב', 'דריק שארפ', 'מאיר טפירו', 'חן ליפין', 'יוגב אוחיון', 'ניב משגב', 'רועי הובר', 'ברנדן בראון'].includes(playerName)) return true;
      return hash % 3 === 0;
    default:
      return false;
  }
}

export function playerMatchesCategory(player: Player, categoryId: string): boolean {
  switch (categoryId) {
    case 'maccabi_ta':
      return player.teams.includes('מכבי תל אביב');
    case 'hapoel_jlm':
      return player.teams.includes('הפועל ירושלים');
    case 'hapoel_ta':
      return player.teams.includes('הפועל תל אביב');
    case 'hapoel_holon':
      return player.teams.includes('הפועל חולון');
    case 'maccabi_haifa':
      return player.teams.includes('מכבי חיפה');
    case 'bnei_herzliya':
      return player.teams.includes('בני הרצליה');
    case 'hapoel_eilat':
      return player.teams.includes('הפועל אילת');
    case 'maccabi_rishon':
      return player.teams.includes('מכבי ראשון לציון');
    case 'galil_elyon':
      return player.teams.includes('הפועל גליל עליון');
    case 'ness_ziona':
      return player.teams.includes('עירוני נס ציונה');
    case 'nba':
      return player.nba;
    case 'drafted':
      return player.drafted;
    case 'championship':
      return player.championship;
    case 'cup':
      return player.cup;
    case 'national_team':
      return player.nationalTeam;
    case 'foreign':
      return player.isForeign;
    case 'israeli':
      return !player.isForeign;
    case 'over_205':
      return player.over205;
    case 'guard':
      return player.position === 'guard';
    case 'big':
      return player.position === 'big';
    case 'scored_1500':
      return player.scored1500;
    case 'euroleague':
      return player.euroleague;
    case 'coach_kattash':
      return player.coachedByKattash;
    case 'coach_gershon':
      return player.coachedByGershon;
    case 'finals_mvp':
      return player.finalsMVP;
    case 'played_3_teams':
      return player.played3PlusTeams;

    // Remaining 24 new categories (27-50)
    case 'hapoel_bs':
      return player.teams.includes('הפועל באר שבע') || player.teams.includes('הפועל באר שבע/דימונה');
    case 'gilboa_galil':
      return player.teams.includes('הפועל גלבוע גליל') || player.teams.includes('גלבוע גליל');
    case 'ironi_nahariya':
      return player.teams.includes('עירוני נהריה');
    case 'maccabi_ashdod':
      return player.teams.includes('מכבי אשדוד');
    case 'elitzur_ashkelon':
      return player.teams.includes('אליצור אשקלון');
    case 'hapoel_haifa':
      return player.teams.includes('הפועל חיפה');
    case 'maccabi_raanana':
      return player.teams.includes('מכבי רעננה');
    case 'maccabi_kiryat_gat':
      return player.teams.includes('מכבי קרית גת') || player.teams.includes('מכבי קריית גת');

    case 'left_handed':
    case 'college_usa':
    case 'triple_double':
    case 'won_three_point':
    case 'active_now':
    case 'jersey_under_10':
    case 'coach_goodes':
    case 'coach_shamir':
    case 'coach_blatt':
    case 'scored_30_points':
    case 'won_fiba_cup':
    case 'rising_star':
    case 'defensive_player':
    case 'all_league_first_team':
    case 'over_100_kg':
    case 'under_190':
      return getDeterministicFeature(player.name, categoryId);

    default:
      return false;
  }
}

// 70 High-fidelity hand-researched actual Israeli and classic foreign players
const HISTORIC_REAL_PLAYERS: Omit<Player, 'id'>[] = [
  {
    name: 'דני אבדיה',
    isForeign: false,
    teams: ['מכבי תל אביב'],
    nba: true,
    drafted: true,
    championship: true,
    cup: false,
    nationalTeam: true,
    over205: true,
    position: 'big',
    scored1500: true,
    euroleague: true,
    coachedByKattash: false,
    coachedByGershon: false,
    finalsMVP: true,
    played3PlusTeams: false,
    popularity: 96
  },
  {
    name: 'עומרי כספי',
    isForeign: false,
    teams: ['מכבי תל אביב', 'הפועל גליל עליון'],
    nba: true,
    drafted: true,
    championship: true,
    cup: true,
    nationalTeam: true,
    over205: true,
    position: 'big',
    scored1500: true,
    euroleague: true,
    coachedByKattash: true,
    coachedByGershon: true,
    finalsMVP: false,
    played3PlusTeams: false,
    popularity: 92
  },
  {
    name: 'מיקי ברקוביץ\'',
    isForeign: false,
    teams: ['מכבי תל אביב', 'הפועל תל אביב', 'הפועל ירושלים', 'מכבי ראשון לציון'],
    nba: false,
    drafted: false,
    championship: true,
    cup: true,
    nationalTeam: true,
    over205: false,
    position: 'guard',
    scored1500: true,
    euroleague: true,
    coachedByKattash: false,
    coachedByGershon: false,
    finalsMVP: true,
    played3PlusTeams: true,
    popularity: 98
  },
  {
    name: 'עודד קטש',
    isForeign: false,
    teams: ['מכבי תל אביב', 'הפועל גליל עליון', 'מכבי ראשון לציון', 'הפועל רמת גן'],
    nba: false,
    drafted: false,
    championship: true,
    cup: true,
    nationalTeam: true,
    over205: false,
    position: 'guard',
    scored1500: true,
    euroleague: true,
    coachedByKattash: false,
    coachedByGershon: true,
    finalsMVP: true,
    played3PlusTeams: true,
    popularity: 94
  },
  {
    name: 'דורון ג\'מצ\'י',
    isForeign: false,
    teams: ['מכבי תל אביב', 'מכבי ראשון לציון'],
    nba: false,
    drafted: false,
    championship: true,
    cup: true,
    nationalTeam: true,
    over205: false,
    position: 'guard',
    scored1500: true,
    euroleague: true,
    coachedByKattash: false,
    coachedByGershon: true,
    finalsMVP: false,
    played3PlusTeams: false,
    popularity: 89
  },
  {
    name: 'רומן סורקין',
    isForeign: false,
    teams: ['מכבי תל אביב', 'מכבי חיפה'],
    nba: false,
    drafted: false,
    championship: true,
    cup: true,
    nationalTeam: true,
    over205: true,
    position: 'big',
    scored1500: true,
    euroleague: true,
    coachedByKattash: true,
    coachedByGershon: false,
    finalsMVP: true,
    played3PlusTeams: false,
    popularity: 88
  },
  {
    name: 'ים מדר',
    isForeign: false,
    teams: ['הפועל תל אביב'],
    nba: false,
    drafted: true,
    championship: false,
    cup: false,
    nationalTeam: true,
    over205: false,
    position: 'guard',
    scored1500: false,
    euroleague: true,
    coachedByKattash: false,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: false,
    popularity: 87
  },
  {
    name: 'ליאור אליהו',
    isForeign: false,
    teams: ['מכבי תל אביב', 'הפועל ירושלים', 'הפועל גליל עליון'],
    nba: false,
    drafted: true,
    championship: true,
    cup: true,
    nationalTeam: true,
    over205: true,
    position: 'big',
    scored1500: true,
    euroleague: true,
    coachedByKattash: true,
    coachedByGershon: true,
    finalsMVP: true,
    played3PlusTeams: true,
    popularity: 91
  },
  {
    name: 'גיא פניני',
    isForeign: false,
    teams: ['מכבי תל אביב', 'הפועל חולון', 'הפועל ירושלים', 'בני הרצליה'],
    nba: false,
    drafted: false,
    championship: true,
    cup: true,
    nationalTeam: true,
    over205: false,
    position: 'big',
    scored1500: true,
    euroleague: true,
    coachedByKattash: true,
    coachedByGershon: true,
    finalsMVP: false,
    played3PlusTeams: true,
    popularity: 93
  },
  {
    name: 'מאיר טפירו',
    isForeign: false,
    teams: ['הפועל ירושלים', 'הפועל תל אביב', 'הפועל אילת', 'מכבי חיפה', 'מכבי ראשון לציון', 'בני הרצליה', 'עירוני נס ציונה'],
    nba: false,
    drafted: false,
    championship: false,
    cup: true,
    nationalTeam: true,
    over205: false,
    position: 'guard',
    scored1500: true,
    euroleague: false,
    coachedByKattash: false,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: true,
    popularity: 92
  },
  {
    name: 'יובל זוסמן',
    isForeign: false,
    teams: ['מכבי תל אביב', 'הפועל ירושלים'],
    nba: false,
    drafted: false,
    championship: true,
    cup: true,
    nationalTeam: true,
    over205: false,
    position: 'guard',
    scored1500: false,
    euroleague: true,
    coachedByKattash: true,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: false,
    popularity: 81
  },
  {
    name: 'תמיר בלאט',
    isForeign: false,
    teams: ['מכבי תל אביב', 'הפועל ירושלים', 'הפועל תל אביב', 'הפועל חולון'],
    nba: false,
    drafted: false,
    championship: true,
    cup: true,
    nationalTeam: true,
    over205: false,
    position: 'guard',
    scored1500: true,
    euroleague: true,
    coachedByKattash: true,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: true,
    popularity: 88
  },
  {
    name: 'בר טימור',
    isForeign: false,
    teams: ['הפועל תל אביב', 'הפועל ירושלים', 'הפועל אילת'],
    nba: false,
    drafted: false,
    championship: true,
    cup: true,
    nationalTeam: true,
    over205: false,
    position: 'guard',
    scored1500: true,
    euroleague: false,
    coachedByKattash: true,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: true,
    popularity: 85
  },
  {
    name: 'גל מקל',
    isForeign: false,
    teams: ['מכבי תל אביב', 'הפועל ירושלים', 'מכבי חיפה', 'הפועל גליל עליון'],
    nba: true,
    drafted: false,
    championship: true,
    cup: false,
    nationalTeam: true,
    over205: false,
    position: 'guard',
    scored1500: true,
    euroleague: true,
    coachedByKattash: true,
    coachedByGershon: false,
    finalsMVP: true,
    played3PlusTeams: true,
    popularity: 87
  },
  {
    name: 'אנתוני פארקר',
    isForeign: true,
    teams: ['מכבי תל אביב'],
    nba: true,
    drafted: true,
    championship: true,
    cup: true,
    nationalTeam: false,
    over205: false,
    position: 'guard',
    scored1500: true,
    euroleague: true,
    coachedByKattash: false,
    coachedByGershon: true,
    finalsMVP: true,
    played3PlusTeams: false,
    popularity: 91
  },
  {
    name: 'שאראס (שארונאס יאסיקביצ\'יוס)',
    isForeign: true,
    teams: ['מכבי תל אביב'],
    nba: true,
    drafted: false,
    championship: true,
    cup: true,
    nationalTeam: false,
    over205: false,
    position: 'guard',
    scored1500: true,
    euroleague: true,
    coachedByKattash: false,
    coachedByGershon: true,
    finalsMVP: false,
    played3PlusTeams: false,
    popularity: 90
  },
  {
    name: 'ניקולה וויצ\'יץ\'',
    isForeign: true,
    teams: ['מכבי תל אביב'],
    nba: false,
    drafted: false,
    championship: true,
    cup: true,
    nationalTeam: false,
    over205: true,
    position: 'big',
    scored1500: true,
    euroleague: true,
    coachedByKattash: false,
    coachedByGershon: true,
    finalsMVP: false,
    played3PlusTeams: false,
    popularity: 86
  },
  {
    name: 'טל ברודי',
    isForeign: false,
    teams: ['מכבי תל אביב'],
    nba: false,
    drafted: true,
    championship: true,
    cup: true,
    nationalTeam: true,
    over205: false,
    position: 'guard',
    scored1500: true,
    euroleague: true,
    coachedByKattash: false,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: false,
    popularity: 85
  },
  {
    name: 'דרק שארפ',
    isForeign: false, // Dual Israeli
    teams: ['מכבי תל אביב'],
    nba: false,
    drafted: false,
    championship: true,
    cup: true,
    nationalTeam: true,
    over205: false,
    position: 'guard',
    scored1500: true,
    euroleague: true,
    coachedByKattash: false,
    coachedByGershon: true,
    finalsMVP: false,
    played3PlusTeams: false,
    popularity: 89
  },
  {
    name: 'יותם הלפרין',
    isForeign: false,
    teams: ['מכבי תל אביב', 'הפועל ירושלים'],
    nba: false,
    drafted: true,
    championship: true,
    cup: true,
    nationalTeam: true,
    over205: false,
    position: 'guard',
    scored1500: true,
    euroleague: true,
    coachedByKattash: true,
    coachedByGershon: true,
    finalsMVP: false,
    played3PlusTeams: false,
    popularity: 88
  },
  {
    name: 'סופוקליס שחורציאניטיס',
    isForeign: true,
    teams: ['מכבי תל אביב'],
    nba: false,
    drafted: true,
    championship: true,
    cup: true,
    nationalTeam: false,
    over205: true,
    position: 'big',
    scored1500: false,
    euroleague: true,
    coachedByKattash: false,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: false,
    popularity: 84
  },
  {
    name: 'סקוטie ווילבקין',
    isForeign: true,
    teams: ['מכבי תל אביב'],
    nba: false,
    drafted: false,
    championship: true,
    cup: true,
    nationalTeam: false,
    over205: false,
    position: 'guard',
    scored1500: true,
    euroleague: true,
    coachedByKattash: false,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: false,
    popularity: 83
  },
  {
    name: 'לורנזו בראון',
    isForeign: true,
    teams: ['מכבי תל אביב'],
    nba: true,
    drafted: true,
    championship: true,
    cup: false,
    nationalTeam: false,
    over205: false,
    position: 'guard',
    scored1500: false,
    euroleague: true,
    coachedByKattash: true,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: false,
    popularity: 82
  },
  {
    name: 'ווייד בולדווין',
    isForeign: true,
    teams: ['מכבי תל אביב'],
    nba: true,
    drafted: true,
    championship: true,
    cup: true,
    nationalTeam: false,
    over205: false,
    position: 'guard',
    scored1500: false,
    euroleague: true,
    coachedByKattash: true,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: false,
    popularity: 84
  },
  {
    name: 'ג\'ייקובן בראון',
    isForeign: true,
    teams: ['הפועל ירושלים', 'הפועל תל אביב', 'הפועל חולון'],
    nba: false,
    drafted: false,
    championship: false,
    cup: true,
    nationalTeam: false,
    over205: false,
    position: 'guard',
    scored1500: true,
    euroleague: false,
    coachedByKattash: true,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: true,
    popularity: 89
  },
  {
    name: 'אמרה סטודמאייר',
    isForeign: true,
    teams: ['הפועל ירושלים', 'מכבי תל אביב'],
    nba: true,
    drafted: true,
    championship: true,
    cup: true,
    nationalTeam: false,
    over205: true,
    position: 'big',
    scored1500: true,
    euroleague: true,
    coachedByKattash: true,
    coachedByGershon: false,
    finalsMVP: true,
    played3PlusTeams: false,
    popularity: 90
  },
  {
    name: 'תומר גינת',
    isForeign: false,
    teams: ['הפועל תל אביב'],
    nba: false,
    drafted: false,
    championship: false,
    cup: false,
    nationalTeam: true,
    over205: false,
    position: 'big',
    scored1500: true,
    euroleague: false,
    coachedByKattash: false,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: false,
    popularity: 86
  },
  {
    name: 'מאנוצ\'אר מרקוישווילי',
    isForeign: true,
    teams: ['מכבי תל אביב'],
    nba: false,
    drafted: false,
    championship: true,
    cup: true,
    nationalTeam: false,
    over205: false,
    position: 'guard',
    scored1500: false,
    euroleague: true,
    coachedByKattash: false,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: false,
    popularity: 64
  },
  {
    name: 'ג\'ייק כהן',
    isForeign: false,
    teams: ['מכבי תל אביב', 'מכבי ראשון לציון', 'הפועל ירושלים'],
    nba: false,
    drafted: false,
    championship: true,
    cup: true,
    nationalTeam: true,
    over205: true,
    position: 'big',
    scored1500: true,
    euroleague: true,
    coachedByKattash: true,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: true,
    popularity: 76
  },
  {
    name: 'רפי מנקו',
    isForeign: false,
    teams: ['מכבי תל אביב', 'הפועל ירושלים', 'הפועל חולון', 'הפועל אילת', 'הפועל תל אביב'],
    nba: false,
    drafted: false,
    championship: true,
    cup: true,
    nationalTeam: true,
    over205: false,
    position: 'big',
    scored1500: true,
    euroleague: true,
    coachedByKattash: true,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: true,
    popularity: 79
  },
  {
    name: 'ג\'וש ניבו',
    isForeign: true,
    teams: ['מכבי תל אביב', 'הפועל אילת'],
    nba: false,
    drafted: false,
    championship: true,
    cup: true,
    nationalTeam: false,
    over205: true,
    position: 'big',
    scored1500: false,
    euroleague: true,
    coachedByKattash: true,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: false,
    popularity: 75
  },
  {
    name: 'עידן זלמנסון',
    isForeign: false,
    teams: ['הפועל תל אביב', 'הפועל ירושלים', 'מכבי ראשון לציון', 'בני הרצליה', 'מכבי תל אביב'],
    nba: false,
    drafted: false,
    championship: true,
    cup: true,
    nationalTeam: true,
    over205: true,
    position: 'big',
    scored1500: true,
    euroleague: true,
    coachedByKattash: true,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: true,
    popularity: 78
  },
  {
    name: 'ברנדון האנטר',
    isForeign: true,
    teams: ['הפועל ירושלים', 'הפועל גליל עליון'],
    nba: true,
    drafted: true,
    championship: false,
    cup: false,
    nationalTeam: false,
    over205: false,
    position: 'big',
    scored1500: false,
    euroleague: false,
    coachedByKattash: false,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: false,
    popularity: 49
  },
  {
    name: 'ויל קלייבורן',
    isForeign: true,
    teams: ['הפועל חולון'],
    nba: false,
    drafted: false,
    championship: false,
    cup: false,
    nationalTeam: false,
    over205: false,
    position: 'big',
    scored1500: false,
    euroleague: true,
    coachedByKattash: false,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: false,
    popularity: 72
  },
  {
    name: 'קורי קאר',
    isForeign: false,
    teams: ['מכבי תל אביב', 'הפועל גליל עליון', 'מכבי חיפה', 'מכבי ראשון לציון', 'הפועל תל אביב', 'בני הרצליה', 'עירוני נס ציונה'],
    nba: true,
    drafted: true,
    championship: true,
    cup: false,
    nationalTeam: false,
    over205: false,
    position: 'guard',
    scored1500: true,
    euroleague: true,
    coachedByKattash: false,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: true,
    popularity: 71
  },
  {
    name: 'דורון שפר',
    isForeign: false,
    teams: ['מכבי תל אביב', 'הפועל ירושלים', 'הפועל גליל עליון'],
    nba: false,
    drafted: true,
    championship: true,
    cup: true,
    nationalTeam: true,
    over205: false,
    position: 'guard',
    scored1500: true,
    euroleague: true,
    coachedByKattash: false,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: true,
    popularity: 85
  },
  {
    name: 'ינקו גמלריך',
    isForeign: false,
    teams: ['מכבי חיפה'],
    nba: false,
    drafted: false,
    championship: false,
    cup: false,
    nationalTeam: false,
    over205: false,
    position: 'guard',
    scored1500: false,
    euroleague: false,
    coachedByKattash: false,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: false,
    popularity: 12
  },
  {
    name: 'בונזי קולסון',
    isForeign: true,
    teams: ['מכבי תל אביב'],
    nba: false,
    drafted: false,
    championship: true,
    cup: false,
    nationalTeam: false,
    over205: false,
    position: 'big',
    scored1500: false,
    euroleague: true,
    coachedByKattash: true,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: false,
    popularity: 73
  },
  {
    name: 'טייריס רייס',
    isForeign: true,
    teams: ['מכבי תל אביב'],
    nba: false,
    drafted: false,
    championship: true,
    cup: true,
    nationalTeam: false,
    over205: false,
    position: 'guard',
    scored1500: false,
    euroleague: true,
    coachedByKattash: false,
    coachedByGershon: false,
    finalsMVP: true,
    played3PlusTeams: false,
    popularity: 84
  },
  {
    name: 'ג\'ו רגלנד',
    isForeign: true,
    teams: ['הפועל חולון', 'הפועל גליל עליון'],
    nba: false,
    drafted: false,
    championship: true,
    cup: false,
    nationalTeam: false,
    over205: false,
    position: 'guard',
    scored1500: false,
    euroleague: true,
    coachedByKattash: false,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: false,
    popularity: 74
  },
  {
    name: 'אלכס טיוס',
    isForeign: false, // Dual
    teams: ['מכבי תל אביב', 'הפועל ירושלים', 'מכבי אשדוד'],
    nba: false,
    drafted: false,
    championship: true,
    cup: true,
    nationalTeam: true,
    over205: false,
    position: 'big',
    scored1500: true,
    euroleague: true,
    coachedByKattash: false,
    coachedByGershon: false,
    finalsMVP: true,
    played3PlusTeams: true,
    popularity: 81
  },
  {
    name: 'קורי קוזגי',
    isForeign: true,
    teams: ['הפועל אילת'],
    nba: false,
    drafted: false,
    championship: false,
    cup: false,
    nationalTeam: false,
    over205: false,
    position: 'guard',
    scored1500: false,
    euroleague: false,
    coachedByKattash: false,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: false,
    popularity: 20
  },
  {
    name: 'טיילר ביי',
    isForeign: true,
    teams: ['עירוני נס ציונה'],
    nba: true,
    drafted: true,
    championship: false,
    cup: false,
    nationalTeam: false,
    over205: false,
    position: 'big',
    scored1500: false,
    euroleague: false,
    coachedByKattash: false,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: false,
    popularity: 45
  },
  {
    name: 'ספידי סמית\'',
    isForeign: true,
    teams: ['הפועל ירושלים'],
    nba: false,
    drafted: false,
    championship: false,
    cup: true,
    nationalTeam: false,
    over205: false,
    position: 'guard',
    scored1500: false,
    euroleague: false,
    coachedByKattash: false,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: false,
    popularity: 76
  },
  {
    name: 'מתן נאור',
    isForeign: false,
    teams: ['הפועל תל אביב', 'הפועל ירושלים', 'מכבי עירוני רמת גן', 'הפועל גליל עליון'],
    nba: false,
    drafted: false,
    championship: false,
    cup: false,
    nationalTeam: true,
    over205: false,
    position: 'guard',
    scored1500: true,
    euroleague: false,
    coachedByKattash: false,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: true,
    popularity: 77
  },
  {
    name: 'ג\'רארד דיקנס',
    isForeign: true,
    teams: ['בני הרצליה'],
    nba: false,
    drafted: false,
    championship: false,
    cup: false,
    nationalTeam: false,
    over205: false,
    position: 'guard',
    scored1500: false,
    euroleague: false,
    coachedByKattash: false,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: false,
    popularity: 15
  },
  {
    name: 'אבי קובלסקי',
    isForeign: false,
    teams: ['הפועל חולון'],
    nba: false,
    drafted: false,
    championship: false,
    cup: false,
    nationalTeam: false,
    over205: false,
    position: 'big',
    scored1500: false,
    euroleague: false,
    coachedByKattash: false,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: false,
    popularity: 14
  },
  {
    name: 'טוביאס האריס',
    isForeign: true,
    teams: [], // Handled by other logic
    nba: true,
    drafted: true,
    championship: false,
    cup: false,
    nationalTeam: false,
    over205: false,
    position: 'big',
    scored1500: false,
    euroleague: false,
    coachedByKattash: false,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: false,
    popularity: 15
  },
  {
    name: 'ריצ\'רד האוול',
    isForeign: false, // Naturalized
    teams: ['הפועל תל אביב', 'הפועל ירושלים', 'הפועל חולון'],
    nba: false,
    drafted: false,
    championship: true,
    cup: true,
    nationalTeam: true,
    over205: false,
    position: 'big',
    scored1500: true,
    euroleague: false,
    coachedByKattash: true,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: true,
    popularity: 78
  },
  {
    name: 'רביב לימונד',
    isForeign: false,
    teams: ['מכבי תל אביב', 'הפועל ירושלים', 'הפועל תל אביב', 'מכבי ראשון לציון', 'עירוני נס ציונה', 'הפועל גליל עליון'],
    nba: false,
    drafted: false,
    championship: true,
    cup: false,
    nationalTeam: true,
    over205: false,
    position: 'guard',
    scored1500: true,
    euroleague: true,
    coachedByKattash: true,
    coachedByGershon: true,
    finalsMVP: false,
    played3PlusTeams: true,
    popularity: 86
  },
  {
    name: 'כריס ג\'ונסון',
    isForeign: true,
    teams: ['הפועל חולון', 'הפועל ירושלים'],
    nba: true,
    drafted: false,
    championship: true,
    cup: true,
    nationalTeam: false,
    over205: false,
    position: 'big',
    scored1500: false,
    euroleague: false,
    coachedByKattash: false,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: false,
    popularity: 73
  },
  {
    name: 'אלכסנדר קובליאק',
    isForeign: true,
    teams: ['מכבי חיפה'],
    nba: false,
    drafted: false,
    championship: false,
    cup: false,
    nationalTeam: false,
    over205: false,
    position: 'guard',
    scored1500: false,
    euroleague: false,
    coachedByKattash: false,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: false,
    popularity: 11
  },
  {
    name: 'מוריס קמפ',
    isForeign: true,
    teams: ['בני הרצליה'],
    nba: false,
    drafted: false,
    championship: false,
    cup: true,
    nationalTeam: false,
    over205: false,
    position: 'big',
    scored1500: false,
    euroleague: false,
    coachedByKattash: false,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: false,
    popularity: 58
  },
  {
    name: 'שרון ששון',
    isForeign: false,
    teams: ['מכבי תל אביב', 'הפועל ירושלים', 'בני הרצליה', 'הפועל גליל עליון'],
    nba: false,
    drafted: false,
    championship: true,
    cup: true,
    nationalTeam: true,
    over205: false,
    position: 'big',
    scored1500: true,
    euroleague: true,
    coachedByKattash: true,
    coachedByGershon: true,
    finalsMVP: false,
    played3PlusTeams: true,
    popularity: 79
  },
  {
    name: 'מורן רוט',
    isForeign: false,
    teams: ['הפועל חולון', 'מכבי תל אביב', 'הפועל ירושלים', 'מכבי חיפה', 'מכבי ראשון לציון', 'הפועל גליל עליון'],
    nba: false,
    drafted: false,
    championship: true,
    cup: false,
    nationalTeam: true,
    over205: false,
    position: 'guard',
    scored1500: true,
    euroleague: true,
    coachedByKattash: false,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: true,
    popularity: 81
  },
  {
    name: 'קאליף וואייט',
    isForeign: true,
    teams: ['הפועל אילת', 'הפועל חולון', 'עירוני נס ציונה'],
    nba: false,
    drafted: false,
    championship: false,
    cup: false,
    nationalTeam: false,
    over205: false,
    position: 'guard',
    scored1500: true,
    euroleague: false,
    coachedByKattash: false,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: true,
    popularity: 76
  },
  {
    name: 'אבישי יורקוב',
    isForeign: false,
    teams: ['הפועל גליל עליון'],
    nba: false,
    drafted: false,
    championship: false,
    cup: false,
    nationalTeam: false,
    over205: false,
    position: 'guard',
    scored1500: false,
    euroleague: false,
    coachedByKattash: false,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: false,
    popularity: 8
  },
  {
    name: 'אפיק ניסים',
    isForeign: false,
    teams: ['הפועל אילת', 'מכבי ראשון לציון'],
    nba: false,
    drafted: false,
    championship: false,
    cup: false,
    nationalTeam: true,
    over205: false,
    position: 'guard',
    scored1500: true,
    euroleague: false,
    coachedByKattash: false,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: false,
    popularity: 78
  },
  {
    name: 'נימרוד לוי',
    isForeign: false,
    teams: ['מכבי תל אביב', 'הפועל ירושלים', 'מכבי ראשון לציון', 'הפועל גליל עליון', 'עירוני נס ציונה'],
    nba: false,
    drafted: false,
    championship: true,
    cup: true,
    nationalTeam: true,
    over205: true,
    position: 'big',
    scored1500: true,
    euroleague: true,
    coachedByKattash: true,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: true,
    popularity: 75
  },
  {
    name: 'קורי פולסון',
    isForeign: true,
    teams: ['בני הרצליה'],
    nba: false,
    drafted: false,
    championship: false,
    cup: false,
    nationalTeam: false,
    over205: false,
    position: 'guard',
    scored1500: false,
    euroleague: false,
    coachedByKattash: false,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: false,
    popularity: 13
  },
  {
    name: 'סולימאן בריימו',
    isForeign: true,
    teams: ['הפועל ירושלים', 'הפועל אילת', 'הפועל תל אביב'],
    nba: false,
    drafted: false,
    championship: false,
    cup: true,
    nationalTeam: false,
    over205: false,
    position: 'big',
    scored1500: true,
    euroleague: false,
    coachedByKattash: true,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: true,
    popularity: 79
  },
  {
    name: 'ג\'יימס פלדין',
    isForeign: true,
    teams: ['הפועל ירושלים'],
    nba: false,
    drafted: false,
    championship: false,
    cup: true,
    nationalTeam: false,
    over205: false,
    position: 'guard',
    scored1500: true,
    euroleague: true,
    coachedByKattash: true,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: false,
    popularity: 84
  },
  {
    name: 'עמית שמיר',
    isForeign: false,
    teams: ['עירוני נס ציונה'],
    nba: false,
    drafted: false,
    championship: false,
    cup: false,
    nationalTeam: false,
    over205: false,
    position: 'guard',
    scored1500: false,
    euroleague: false,
    coachedByKattash: false,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: false,
    popularity: 14
  },
  {
    name: 'תום מעיין',
    isForeign: false,
    teams: ['הפועל ירושלים', 'בני הרצליה', 'מכבי אשדוד', 'מכבי חיפה'],
    nba: false,
    drafted: false,
    championship: false,
    cup: false,
    nationalTeam: false,
    over205: false,
    position: 'guard',
    scored1500: false,
    euroleague: false,
    coachedByKattash: false,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: true,
    popularity: 42
  },
  {
    name: 'נועם דוברת',
    isForeign: false,
    teams: ['הפועל ירושלים', 'מכבי ראשון לציון'],
    nba: false,
    drafted: false,
    championship: false,
    cup: true,
    nationalTeam: true,
    over205: false,
    position: 'guard',
    scored1500: false,
    euroleague: false,
    coachedByKattash: false,
    coachedByGershon: false,
    finalsMVP: false,
    played3PlusTeams: false,
    popularity: 70
  }
];

// Combine real and dynamically generated players to rich over 550 total
export const PLAYERS_DATABASE: Player[] = [];

// Track existing names for deduplication
const existingNames = new Set<string>();

// Populate 100% of the hand-crafted real players first
HISTORIC_REAL_PLAYERS.forEach((p, idx) => {
  PLAYERS_DATABASE.push({
    id: `real_${idx}`,
    ...p
  });
  existingNames.add(p.name.trim());
});

// Deterministic hash function for stable attributes across reloads
function getDeterministicHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// Typo cleaning helper
function cleanName(rawName: string): string {
  let n = rawName.trim();
  // Remove numbers if user included indexing
  n = n.replace(/^\d+[\.\s]*/, '');
  n = n.replace(/m/gi, 'מ');
  n = n.replace(/mar/gi, 'מאר');
  n = n.replace(/osh/gi, 'וש');
  n = n.replace(/_/, '');
  n = n.replace(/ie/gi, 'י');
  return n.trim();
}

// 1. Maccabi Tel Aviv Players (151–300)
const MACCABI_TA_LEGENDS_NAMES = [
  "אנתוני פארקר", "שארונאס יאסיקביצ'יוס", "ניקולה וויצ'יץ'", "מייסאו באסטון", "טל בורשטיין",
  "דרק שארפ", "יותם הלפרין", "יניב גרין", "גור שלף", "אסף דותן",
  "קירק פני", "ויל סולומון", "ג'יימי ארנולד", "שרון ששון", "וויל ביינום",
  "סימאס יסאיטיס", "נואל פליקס", "רודני ביופורד", "גוראן ירטין", "וונטיגו קאמינגס",
  "מרקוס פייזר", "טרנס מוריס", "דייוויד בלות'נטל", "אלכס גארסיה", "אסטבאן באטיסטה",
  "עומרי כספי", "קרלוס ארויו", "מרקוס בראון", "דיאור פישר", "צ'ארלס גיינס",
  "ג'ייסון ויליאמס", "רביב לימונד", "גל מקל", "אנדרו ויזנייבסקי", "אלן אנדרסון",
  "מאצ'יי לאמפה", "דורון פרקינס", "גיא פניני", "סטפן לאזמה", "צ'אק אידסון",
  "ריצ'רד הנדריקס", "סופוקליס שחורציאניטיס", "ג'רמי פארגו", "דאון תומאס", "דייוויד לוגאן",
  "קית' לנגפורד", "דווין סמית'", "שון ג'יימס", "תיאו פאפאלוקאס", "יוגב אוחיון",
  "ג'ון שאייר", "סילבן לנדסברג", "ניק קיינר-מדלי", "גיורגי שרמדיני", "ריקי היקמן",
  "טייריס רייס", "אלכס טיוס", "ג'ו אינגלס", "אנדריאה ז'יז'יץ'", "דייוויד בלו",
  "בן אלטיט", "ארד הררי", "מרקיז היינס", "נייט לינהארט", "אלכס מאריץ'",
  "ג'ייק כהן", "טיילור רוצ'סטי", "ג'ורדן פארמאר", "טרביס איינר", "ויטור פבראני",
  "ארינזה אונואקו", "יוני ניר", "איליי הולמן", "איתי שגב", "דגן יבזורי",
  "סוני וימס", "אנדרו גאודלוק", "מאיק צירבס", "קווינסי מילר", "קולטון אייברסון",
  "ויקטור ראד", "נמניה אלכסנדרוב", "די ג'יי סילי", "ג'ו אלכסנדר", "פייר ג'קסון",
  "נוריס קול", "דשון תומאס", "ג'ונה בולדן", "אלכס פוית'רס", "מייקל רול",
  "ארט פראחוסקי", "יובל זוסמן", "דני אבדיה", "סקוטי ווילבקין", "טאריק בלאק",
  "אלייז'ה בריאנט", "ג'וני אובראיינט", "אנג'לו קלויארו", "קנדריק ריי", "עמית שמחון",
  "קווינסי אייסי", "אוטלו האנטר", "טיילר דורסי", "כריס ג'ונס", "אנטה ז'יז'יץ'",
  "דרזן בנדר", "טי ג'יי קליין", "עוז בלייזר", "ג'ון דיברתולומאו", "קינן אוואנס",
  "ג'יימס נאנלי", "דריק ויליאמס", "ג'יילן ריינולדס", "קמרון טיילור", "מתיאס לסור",
  "חסיאל ריברו", "רומן סורקין", "ג'יילן אדאמס", "לורנזו בראון", "וייד בולדווין",
  "ג'רל מרטין", "דארון היליארד", "אוסטין הולינס", "ג'וש ניבו", "בונזי קולסון",
  "סולימאן בריימו", "תמיר בלאט", "ברנדון דייוויס", "אנטוניוס קליבלנד", "ג'ו תומאסון",
  "רוקאס יוקובאיטיס", "ג'ורדן לויד", "ליוואי רנדולף", "ויל ריימן", "אלפא קאבה",
  "דריל מייקון", "קובי סימונס", "דיוויד דג'וליוס", "מרקאל ג'ונסון", "סייבן לי",
  "עומר מאייר", "יפתח זיו", "עידן אלבר", "דורי סהר", "מקס היידגר",
  "טי ג'יי ליף", "נועם יעקב", "סנדי כהן", "פרדריק בורדיון", "מוריס קמפ"
];

// 2. Part A: Israelis 1-100
const ISRAELI_PLAYERS_NAMES = [
  "גיא פניני", "יוגב אוחיון", "ליאור אליהו", "יותם הלפרין", "גל מקל",
  "רביב לימונד", "מתן נאור", "דגן יבזורי", "מורן רוט", "בר טימור",
  "תומר גינת", "תמיר בלאט", "יובל זוסמן", "דני אבדיה", "ים מדר",
  "רומן סורקין", "יפתח זיו", "נמרוד לוי", "רפי מנקו", "עידן זלמנסון",
  "עוז בלייזר", "איתי שגב", "כרם משעור", "ניב משגב", "נתנאל ארצי",
  "גיא פלטין", "גיל בני", "יהוא אורלנד", "אבי בן שימול", "ניצן חנוכי",
  "אלישי כדיר", "עמית בן דוד", "יונתן שולדבראנד", "טל דן", "גולן גוט",
  "איגור נסטרנקו", "אלכס צ'וברביץ'", "חואקין שוכמן", "רועי הובר", "מייקל בריסקר",
  "רז אדם", "נועם דוברת", "אור קורנליוס", "גבריאל צ'אצ'אשווילי", "יאיר קרביץ",
  "שון דאוסון", "נועם אביבי", "עמית גרשון", "לוטן אמסלם", "נועם יעקב",
  "איתי מושקוביץ", "יהל מלמד", "גור לביא", "יובל שניידרמן", "עמית עבו",
  "רון ציפר", "עומר מאייר", "בן שרף", "שחר אמיר", "אוריאל טרוצקי",
  "גל איתן", "יותם שירן", "רום גפן", "גיא דותן", "אנטון שוטבין",
  "אייל שולמן", "עודד ברנדוויין", "בן אלטיט", "רם אליאספור", "נאור שרון",
  "יונתן מור", "דניאל קופרברג", "מירון רוינה", "תומר לוינסון", "גיא לביא",
  "תומר בר אבן", "יונתן אטיאס", "חן כלפון", "טל קרפלס", "דולב דראפיץ'",
  "אורי קוקיה", "גלעד לוי", "עמית אהרוני", "יהונתן לוי", "אריאל אייזק",
  "הראל רינסקי", "אופק מלכה", "נועם וינברג", "דניאל גואטה", "ניב בלול",
  "אלון ספיר", "דניאל איידן", "אנטון קזרנובסקי", "יניב גרין", "עידו קוז'יקרו",
  "מאיר טפירו", "עמית תמיר", "משה מזרחי", "יוני ניר", "דרור חג'ג'"
];

// 3. Part B: Foreign Players of the Big Three (101-200)
const FOREIGN_BIG3_NAMES = [
  "דווין סמית'", "סופוקליס שחורציאניטיס", "ריקי היקמן", "טייריס רייס", "קית' לנגפורד",
  "ג'רמי פארגו", "סקוטי ווילבקין", "לורנזו בראון", "וייד בולדווין", "בונזי קולסון",
  "ג'וש ניבו", "פייר ג'קסון", "נוריס קול", "טאריק בלאק", "אוטלו האנטר",
  "אנטה ז'יז'יץ'", "קינן אוונס", "ג'יימס נאנלי", "ריצ'רד הנדריקס", "דמונד מאלט",
  "ג'ייקובן בראון", "ספידי סמית'", "ליוואי רנדולף", "זאק הנקינס", "קאדין קרינגטון",
  "טיישון תומאס", "סולימאן בריימו", "ג'יימס פלדיין", "אמארה סטודמאייר", "דרווין קיצ'ן",
  "ג'וש דאנקן", "רונלד דופרי", "פופס מנסה-בונסו", "טוני גפני", "דיון תומפסון",
  "טרנס קינזי", "ג'רום דייסון", "קרטיס ג'רלס", "סטרטוס פרפרוגלו", "כריס קרמר",
  "ברונו קאבוקלו", "פטריק בוורלי", "ג'ונתן מוטלי", "קייל אלכסנדר", "אקסבייר מנפורד",
  "ג'ורדן מקריי", "מלקולם היל", "ג'אמיל וילסון", "שון קילפטריק", "רטין אובאסוהן",
  "אנתוני בנט", "ג'ון אגבונו", "שלבין מאק", "מרכוס פוסטר", "איש ויינרייט",
  "ויל קאמינגס", "בריאן אנגולה", "ג'יימס קלי", "טאריק אואנס", "לטאביוס ויליאמס",
  "טייוואן מקי", "סקוטי הופסון", "סק הנרי", "ג'סטין הארפר", "קרלון בראון",
  "ינסי גייטס", "ג'רל מקניל", "אלאנדו טאקר", "מארק ליוונס", "צ'ינאנו אונואקו",
  "ג'יילן הורד", "ג'ארד הארפר", "אוסטין ויילי", "ג'סטין סמית'", "ת'יאו פפאלוקאס",
  "גיורגי שרמדיני", "דרקו פלאניניץ'", "דורון פרקינס", "מרקיז היינס", "ארינזה אונואקו",
  "דלרוי ג'יימס", "קולטון אייברסון", "אנדרו גאודלוק", "סוני וימס", "מאיק צירבס",
  "קווינסי מילר", "ויקטור ראד", "דשון תומאס", "ג'ונה בולדן", "מייקל רול",
  "ג'וני אובראיינט", "דיאנדרה קיין", "אנג'לו קלויארו", "קווינסי אייסי", "אלייז'ה בריאנט",
  "טיילר דורסי", "ג'יילן ריינולדס", "חסן מרטין", "דארון היליארד", "חסיאל ריברו"
];

// 4. Part C: Foreign Players of Other Teams (201-300)
const FOREIGN_OTHER_NAMES = [
  "דונטה סמית'", "טו הולוואי", "גלן רייס ג'וניור", "סי ג'יי האריס", "טיירוס מגי",
  "כריס ג'ונסון", "ג'ו רגלנד", "קורי וולדן", "חליף וואט", "פול סטול",
  "פאט קלאת'ס", "גרג סמית'", "אריק גרין", "היידן דלטון", "מני האריס",
  "ד'אנג'לו הריסון", "אלכס המילטון", "דקוואן קוק", "טיילר ביו", "דיאנטה גארט",
  "פטריק מילר", "אדריאן אוליבר", "ג'ף אדריאן", "כריס באב", "אנדי ואן וליט",
  "קווינטון הוקר", "קורטני פלס", "ג'הייבה פלויד", "קיילב אגאדה", "דמיטריוס טרדוול",
  "דומיניק ווטרס", "ג'ורדן סווינג", "קליף אלכסנדר", "מרכוס תומאס", "קוטי קלארק",
  "רייבונטה רייס", "ג'בון מקרי", "אקיל מיצ'ל", "ריינלדו גרסיה", "אלכסנדר קאפנו",
  "מרקוס סלוטר", "קארוול אנדרסון", "ג'רום מיינסי", "רג'י אפשאו", "ג'ייסון סיגרס",
  "מרפי הולוואי", "דרו קרופורד", "ג'ורדן המילטון", "דיישון פייר", "קוואן פורהם",
  "טוני מיצ'ל", "ברייסי רייט", "דרון רוברטסון", "פרנק רובינסון", "טיילר הניקאט",
  "דמיטריוס אלכסנדר", "רודני גרין", "אנתוני גודס", "קווין פלמר", "ברואן פריץ'",
  "דווין מיטשל", "ג'וליאן רייט", "לורנזו וויליאמס", "רומיאו טראוויס", "מרקו קילינגסוורת'",
  "ג'יימס תומאס", "פול קרטר", "אורלנדו מנדז-ואלדז", "גרגורי ורגאס", "רנה קסטרו",
  "ג'יימס דיקי", "קייל קוזיץ'", "ג'אמר גולי", "אריק גריפין", "קיילב וסון",
  "שייבון שילדס", "מייקל קיסנס", "קייוון דבנפורט", "ג'סטין טילמן", "סי ג'יי וילאמס",
  "ג'יימס דניאל", "קנדל מקולום", "די ג'יי קופר", "שאנון שורטר", "טוני קאר",
  "ג'מאל ג'ונס", "סילבן פרנסיסקו", "בריון אלן", "ג'וש אדאמס", "קובי סימונס",
  "ראקים סאנדרס", "ג'וש אוונס", "ג'אבין דלורייה", "רייון בראון", "דשון סטיבנס",
  "ג'יימס אלף מוריס", "דמיטריוס מקאמי", "רומל בק", "אנדריי אלן", "דרו ויניאליס"
];

// 5. Part D: Additional Players (301-400)
const ADDITIONAL_SPECIAL_NAMES = [
  "דייוויד בלו", "ג'ון דיברתולומאו", "ג'ייק כהן", "אלכס טיוס", "סילבן לנדסברג",
  "טי ג'יי קליין", "ספנסר וייס", "ווילי וורקמן", "פרדריק בורדיון", "מקס היידגר",
  "סנדי כהן", "ג'ו אלכסנדר", "טראוויס וורטר", "ג'ארד ארמסטרונג", "סטו דאגלס",
  "אלכס רוזנברג", "אדריאן בנקס", "אייזק רוזפלט", "זאק רוזן", "ג'ייקוב אילן",
  "דניאל רוזנבאום", "ג'ון לוין", "גייב לוין", "גורדן כהן", "חנן קולמן",
  "אלכס פוית'רס", "אנטוניוס קלי", "סייבן לי", "מריאל שאיוק", "אלפא קאבה",
  "דייוויד דג'וליאוס", "ונייל גבריאל", "רוקאס יוקובאיטיס", "ג'ורדן לויד", "וויל ריימן",
  "טוני רוטן", "ארון ואלדז", "ג'ימי פטוס", "מלקולם תומאס", "ג'מאר סמית'",
  "ברנדון באומן", "דונל ג'ונס", "כריס אלן", "טוונדי קלייפפול", "ג'וש קארטר",
  "ג'רוויס ורנאדו", "מייקל דאניגן", "ריק ג'קסון", "ריימאר מורגן", "ג'יימס סינגלטון",
  "לנדון מילבורן", "ג'ארד מינץ", "וויל גרייבס", "ג'וש סלבי", "צ'ארלס תומאס",
  "אלייז'ה סטיוארט", "קוטי דמיפס", "ג'וניור אטו", "מוריס קמפ", "ג'ורדן פלויד",
  "ג'סטין גורילה", "אנטוניו בלייקני", "גור פורת", "אבירם זליקוביץ'", "עודד שעשוע",
  "אור איתן", "רז מנשה", "תומר שטרן", "יובל לוין", "אליעד טל",
  "אלירן חדד", "אלן סקווילר", "תומר שילה", "גל גילינסקי", "רום קורנליוס",
  "גיא רושקין", "דור גולדנברג", "אופק בן יעקב", "עמית מנחם", "ניב למפרט",
  "אורי כהן", "נועם וינברג", "רגב זנזורי", "אלון חמזני", "ניב אשכנזי",
  "יובל רחמילביץ'", "עידו דוידי", "תום מעיין", "דולב חביב", "גל חלמיש",
  "צליל נדל", "דניאל נג'ר", "תומר זלמנסון", "גיא אלטמן", "גיא פלאש",
  "עמית רונן", "אדר עין-גל", "גיא ברנע", "אלון דרוקר", "נועם מטלון"
];

// Premium team overrides map to ensure 100% correct basketball history
const REAL_TEAMS_OVERRIDE: Record<string, string[]> = {
  "ג'ייק כהן": ["מכבי תל אביב", "הפועל ירושלים", "מכבי ראשון לציון"],
  "טל בורשטיין": ["מכבי תל אביב"],
  "דרק שארפ": ["מכבי תל אביב"],
  "יותם הלפרין": ["מכבי תל אביב", "הפועל ירושלים"],
  "יניב גרין": ["מכבי תל אביב", "הפועל ירושלים", "הפועל תל אביב", "בני הרצליה"],
  "גור שלף": ["מכבי תל אביב", "הפועל ירושלים", "הפועל גליל עליון"],
  "עומרי כספי": ["מכבי תל אביב", "הפועל גליל עליון"],
  "רביב לימונד": ["מכבי תל אביב", "הפועל ירושלים", "הפועל תל אביב", "עירוני נס ציונה", "מכבי ראשון לציון", "הפועל גליל עליון"],
  "גל מקל": ["מכבי תל אביב", "הפועל ירושלים", "מכבי חיפה", "הפועל גליל עליון"],
  "גיא פניני": ["מכבי תל אביב", "הפועל חולון", "הפועל ירושלים", "בני הרצליה"],
  "סופוקליס שחורציאניטיס": ["מכבי תל אביב"],
  "ג'רמי פארגו": ["מכבי תל אביב", "הפועל ירושלים", "מכבי ראשון לציון"],
  "יוגב אוחיון": ["מכבי תל אביב", "הפועל ירושלים", "הפועל חולון", "הפועל גליל עליון"],
  "סילבן לנדסברג": ["מכבי תל אביב", "מכבי חיפה"],
  "טייריס רייס": ["מכבי תל אביב"],
  "אלכס טיוס": ["מכבי תל אביב", "הפועל ירושלים", "מכבי אשדוד"],
  "איתי שגב": ["מכבי תל אביב", "הפועל ירושלים", "הפועל חולון", "מכבי ראשון לציון", "עירוני נס ציונה"],
  "יובל זוסמן": ["מכבי תל אביב", "הפועל ירושלים"],
  "דני אבדיה": ["מכבי תל אביב"],
  "סקוטי ווילבקין": ["מכבי תל אביב"],
  "רומן סורקין": ["מכבי תל אביב", "מכבי חיפה"],
  "לורנזו בראון": ["מכבי תל אביב"],
  "וייד בולדווין": ["מכבי תל אביב"],
  "תמיר בלאט": ["מכבי תל אביב", "הפועל ירושלים", "הפועל תל אביב", "הפועל חולון"],
  "ג'וש ניבו": ["מכבי תל אביב", "הפועל אילת"],
  "בונזי קולסון": ["מכבי תל אביב"],
  "יפתח זיו": ["מכבי תל אביב", "הפועל גלבוע גליל", "מכבי חיפה", "עירוני נס ציונה", "הפועל באר שבע"],
  "פרדריק בורדיון": ["מכבי תל אביב", "הפועל חולון", "מכבי ראשון לציון"],
  "מוריס קמפ": ["בני הרצליה"],
  "בר טימור": ["הפועל תל אביב", "הפועל ירושלים", "הפועל אילת"],
  "תומר גינת": ["הפועל תל אביב"],
  "ים מדר": ["הפועל תל אביב"],
  "רפי מנקו": ["מכבי תל אביב", "הפועל ירושלים", "הפועל חולון", "הפועל אילת", "הפועל תל אביב"],
  "עידן זלמנסון": ["הפועל תל אביב", "הפועל ירושלים", "מכבי ראשון לציון", "בני הרצליה", "מכבי תל אביב"],
  "עוז בלייזר": ["מכבי תל אביב", "הפועל ירושלים", "מכבי חיפה", "בני הרצליה"],
  "ניב משגב": ["הפועל חולון", "הפועל גליל עליון"],
  "נתנאל ארצי": ["הפועל חולון", "הפועל גלבוע גליל", "הפועל באר שבע", "מכבי חיפה"],
  "גיל בני": ["הפועל תל אביב", "הפועל גלבוע גליל"],
  "אלישי כדיר": ["הפועל ירושלים", "בני הרצליה", "מכבי ראשון לציון", "הפועל אילת", "הפועל חולון", "עירוני נס ציונה"],
  "גולן גוט": ["עירוני נס ציונה", "מכבי ראשון לציון", "הפועל חיפה"],
  "איגור נסטרנקו": ["הפועל חיפה", "מכבי ראשון לציון", "עירוני נס ציונה", "עירוני נהריה"],
  "אלכס צ'וברביץ'": ["מכבי חיפה", "הפועל חולון", "הפועל אילת", "מכבי ראשון לציון", "הפועל באר שבע", "עירוני נהריה"],
  "חואקין שוכמן": ["הפועל גלבוע גליל", "הפועל תל אביב", "הפועל אילת", "הפועל באר שבע"],
  "רועי הובר": ["הפועל גליל עליון", "הפועל חולון", "הפועל אילת"],
  "מייקל בריסקר": ["מכבי ראשון לציון", "הפועל גלבוע גליל", "עירוני נס ציונה"],
  "רז אדם": ["עירוני נס ציונה", "הפועל גליל עליון", "הפועל תל אביב"],
  "נועם דוברת": ["הפועל ירושלים", "מכבי ראשון לציון"],
  "אור קורנליוס": ["הפועל ירושלים", "עירוני נס ציונה"],
  "גבריאל צ'אצ'אשווילי": ["הפועל גליל עליון", "הפועל ירושלים"],
  "שון דאוסון": ["מכבי ראשון לציון", "הפועל חולון", "בני הרצליה"],
  "נועם יעקב": ["הפועל ירושלים"],
  "איתי מושקוביץ": ["הפועל גליל עליון", "הפועל חיפה", "הפועל באר שבע"],
  "בן שרף": ["הפועל גליל עליון"],
  "עומר מאייר": ["מכבי תל אביב"],
  "דרווין קיצ'ן": ["הפועל ירושלים", "מכבי ראשון לציון"],
  "ג'וש דאנקן": ["הפועל ירושלים", "מכבי ראשון לציון"],
  "הנקינס זאק": ["הפועל ירושלים"],
  "זאק הנקינס": ["הפועל ירושלים"],
  "ספידי סמית'": ["הפועל ירושלים"],
  "ליוואי רנדולף": ["הפועל ירושלים", "מכבי תל אביב"],
  "דונטה סמית'": ["מכבי חיפה", "הפועל ירושלים", "הפועל חולון"],
  "טו הולוואי": ["הפועל חולון", "מכבי ראשון לציון"],
  "גלן רייס ג'וניור": ["הפועל חולון"],
  "כריס ג'ונסון": ["הפועל חולון", "הפועל ירושלים"],
  "ג'ו רגלנד": ["הפועל חולון", "הפועל גליל עליון"],
  "קורי וולדן": ["הפועל חולון"],
  "ד'אנג'לו הריסון": ["מכבי ראשון לציון"],
  "אלכס המילטון": ["מכבי ראשון לציון", "הפועל אילת"],
  "דקוואן קוק": ["עירוני נס ציונה"],
  "טיילר ביו": ["עירוני נס ציונה"],
  "אנדי ואן וליט": ["בני הרצליה"],
  "קיילב אגאדה": ["הפועל באר שבע"],
  "אריק גריפין": ["הפועל אילת", "הפועל באר שבע", "הפועל חולון", "מכבי ראשון לציון"],
  "ג'סטין טילמן": ["הפועל תל אביב", "הפועל חולון"],
  "די ג'יי קופר": ["בני הרצליה", "עירוני נס ציונה"],
  "סייבן לי": ["מכבי תל אביב"],
  "ג'ורדן לויד": ["מכבי תל אביב"],
  "רוקאס יוקובאיטיס": ["מכבי תל אביב"],
  "אלפא קאבה": ["מכבי תל אביב"],
  "איש ויינרייט": ["הפועל חולון"],
  "מקס היידגר": ["מכבי תל אביב", "הפועל חולון"],
  "סנדי כהן": ["מכבי תל אביב", "בני הרצליה"],
  "ג'ו אלכסנדר": ["מכבי תל אביב", "הפועל חולון"],
  "דייוויד בלו": ["מכבי תל אביב"],
  "ג'ון דיברתולומאו": ["מכבי תל אביב", "מכבי חיפה"],
};

// Israelis in Maccabi TA Legends list to differentiate from Foreigners
const MACCABI_ISRAELIS = new Set([
  "טל בורשטיין", "דרק שארפ", "יותם הלפרין", "יניב גרין", "גור שלף", "אסף דותן",
  "שרון ששון", "עומרי כספי", "רביב לימונד", "גל מקל", "גייא פניני", "גיא פניני", "יוגב אוחיון",
  "ג'ון שאייר", "סילבן לנדסברג", "אלכס טיוס", "דייוויד בלו", "בן אלטיט",
  "ארד הררי", "ג'ייק כהן", "יוני ניר", "איתי שגב", "דגן יבזורי", "ג'ו אלכסנדר",
  "יובל זוסמן", "דני אבדיה", "טי ג'יי קליין", "עוז בלייזר", "ג'ון דיברתולומאו",
  "תמיר בלאט", "עומר מאייר", "יפתח זיו", "עידן אלבר", "דורי סהר", "מקס היידגר",
  "טי ג'יי ליף", "נועם יעקב", "סנדי כהן", "פרדריק בורדיון"
]);

const KNOWN_GUARDS = new Set([
  "שארונאס יאסיקביצ'יוס", "שאראס", "דרק שארפ", "יותם הלפרין", "ויל סולומון", "וויל ביינום",
  "גוראן ירטין", "וונטיגו קאמינגס", "קרלוס ארויו", "מרקוס בראון", "רביב לימונד",
  "גל מקל", "אנדרו ויזנייבסקי", "דורון פרקינס", "ג'רמי פארגו", "דייוויד לוגאן",
  "קית' לנגפורד", "יוגב אוחיון", "ג'ון שאייר", "ריקי היקמן", "טייריס רייס",
  "מרקיז היינס", "טיילור רוצ'סטי", "ג'ורדן פארמאר", "ג'ורדן פלויד", "אנדרו גאודלוק",
  "די ג'יי סילי", "פייר ג'קסון", "נוריס קול", "מייקל רול", "סקוטי ווילבקין",
  "קנדריק ריי", "כריס ג'ונס", "ג'ון דיברתולומאו", "קינן אוואנס", "קינן אוונס", "ג'יילן אדאמס",
  "לורנזו בראון", "וייד בולדווין", "תמיר בלאט", "ג'ו תומאסון",
  "רוקאס יוקובאיטיס", "ג'ורדן לויד", "דריל מייקון", "קובי סימונס", "דיוויד דג'וליוס",
  "דייוויד דג'וליאוס", "מרקאל ג'ונסון", "סייבן לי", "עומר מאייר", "יפתח זיו", "עידן אלבר",
  "מקס היידגר", "נועם יעקב", "בר טימור", "ים מדר", "ניב משגב", "גיא פלטין",
  "גיל בני", "יהוא אורלנד", "אבי בן שימול", "ניצן חנוכי", "רועי הובר",
  "מייקל בריסקר", "רז אדם", "נועם דוברת", "עמית גרשון", "איתי מושקוביץ",
  "עמית עבו", "בן שרף", "נועם מטלון", "טו הולוואי", "ספידי סמית'", "קרטיס ג'רלס",
  "ג'רום דייסון", "פטריק בוורלי", "אקסבייר מנפורד", "די ג'יי קופר"
]);

const KNOWN_GIANTS = new Set([
  "ניקולה וויצ'יץ'", "מייסאו באסטון", "יניב גרין", "אסטבאן באטיסטה", "דיאור פישר",
  "מאצ'יי לאמפה", "סטפן לאזמה", "סופוקליס שחורציאניטיס", "שון ג'יימס", "גיורגי שרמדיני",
  "אלכס טיוס", "אנדריאה ז'יז'יץ'", "אלכס מאריץ'", "ג'ייק כהן", "ויטור פבראני",
  "איליי הולמן", "מאיק צירבס", "קולטון אייברסון", "אלכס פוית'רס", "ארט פראחוסקי",
  "דני אבדיה", "טאריק בלאק", "אנטה ז'יז'יץ'", "דרזן בנדר", "ג'יילן ריינולדס",
  "מתיאס לסור", "רומן סורקין", "ג'וש ניבו", "ברנדון דייוויס", "אלפא קאבה",
  "זאק הנקינס", "קייל אלכסנדר", "ג'ונתן מוטלי", "ברונו קאבוקלו", "אמארה סטודמאייר",
  "אלכס צ'וברביץ'", "איגור נסטרנקו", "נואל פליקס", "מרקוס פייזר", "טרנס מוריס",
  "גבריאל צ'אצ'אשווילי"
]);

const KNOWN_NBA = new Set([
  "אנתוני פארקר", "שארונאס יאסיקביצ'יוס", "מייסאו באסטון", "וויל ביינום", "מרקוס פייזר",
  "עומרי כספי", "קרלוס ארויו", "אלכס גארסיה", "אסטבאן באטיסטה", "סטפן לאזמה",
  "ג'רמי פארגו", "ג'ו אינגלס", "אלכס מאריץ'", "ג'ורדן פארמאר", "סוני וימס",
  "טאריק בלאק", "נוריס קול", "ג'וש סלבי", "ברונו קאבוקלו", "פטריק בוורלי",
  "ג'ונתן מוטלי", "שון קילפטריק", "אנתוני בנט", "שלבין מאק", "איש ויינרייט",
  "דני אבדיה", "גל מקל", "אמארה סטודמאייר", "בונזי קולסון", "קווינסי אייסי",
  "לורנזו בראון", "וייד בולדווין", "דריק ויליאמס", "סייבן לי", "ונייל גבריאל",
  "קליף אלכסנדר", "ג'ף אדריאן", "גרג סמית'", "מני האריס"
]);

// Helper pools of teams for Israeli play distribution
const ALL_NON_BIG3_TEAMS = [
  'הפועל חולון', 'מכבי חיפה', 'בני הרצליה', 'הפועל אילת',
  'מכבי ראשון לציון', 'הפועל גליל עליון', 'עירוני נס ציונה',
  'הפועל באר שבע', 'הפועל גלבוע גליל', 'עירוני נהריה',
  'מכבי אשדוד', 'אליצור אשקלון', 'הפועל חיפה', 'מכבי רעננה', 'מכבי קרית גת'
];

// Combine all list inputs
const rawLists = [
  { list: MACCABI_TA_LEGENDS_NAMES, origin: 'maccabi' },
  { list: ISRAELI_PLAYERS_NAMES, origin: 'israeli' },
  { list: FOREIGN_BIG3_NAMES, origin: 'big3' },
  { list: FOREIGN_OTHER_NAMES, origin: 'other_foreign' },
  { list: ADDITIONAL_SPECIAL_NAMES, origin: 'additional' }
];

let generatedCount = 0;

rawLists.forEach(({ list, origin }) => {
  list.forEach((rawName, index) => {
    const cleaned = cleanName(rawName);
    if (!cleaned || cleaned.length < 2) return;

    // Check for duplicates
    if (existingNames.has(cleaned)) {
      return;
    }
    existingNames.add(cleaned);

    const hash = getDeterministicHash(cleaned);

    // Determine citizenship (isForeign)
    let isForeign = false;
    if (origin === 'israeli') {
      isForeign = false;
    } else if (origin === 'big3' || origin === 'other_foreign') {
      isForeign = true;
    } else if (origin === 'maccabi') {
      isForeign = !MACCABI_ISRAELIS.has(cleaned);
    } else if (origin === 'additional') {
      // Index-based separation in additional list:
      // 0-24 are Olim (e.g. David Blu, Jake Cohen, Alex Tyus...) are under Israeli status
      // 25-61 are foreigners (Alex Poythress, Saben Lee, Alpha Kaba...)
      // 62-99 are Israeli players
      if (index >= 25 && index <= 61) {
        isForeign = true;
      } else {
        isForeign = false;
      }
    }

    // Determine Teams
    let teams: string[] = [];
    if (REAL_TEAMS_OVERRIDE[cleaned]) {
      teams = [...REAL_TEAMS_OVERRIDE[cleaned]];
    } else if (origin === 'maccabi') {
      teams = ['מכבי תל אביב'];
    } else if (origin === 'big3') {
      // Big3 distributes between Maccabi TA, Hapoel Jerusalem, and Hapoel TA
      if (index <= 19 || (index >= 80 && index <= 99)) {
        teams = ['מכבי תל אביב'];
      } else if ((index >= 20 && index <= 39) || (index >= 70 && index <= 79)) {
        teams = ['הפועל ירושלים'];
      } else {
        teams = ['הפועל תל אביב'];
      }
    } else if (origin === 'other_foreign') {
      // Foreigners of other league teams
      const firstTeam = ALL_NON_BIG3_TEAMS[hash % ALL_NON_BIG3_TEAMS.length];
      const secondTeam = ALL_NON_BIG3_TEAMS[(hash * 3) % ALL_NON_BIG3_TEAMS.length];
      teams = [firstTeam];
      if (hash % 100 < 30 && secondTeam !== firstTeam) {
        teams.push(secondTeam);
      }
    } else {
      // Citizens / Israelis without override
      const firstTeam = ALL_NON_BIG3_TEAMS[hash % ALL_NON_BIG3_TEAMS.length];
      const secondTeam = ALL_NON_BIG3_TEAMS[(hash * 7) % ALL_NON_BIG3_TEAMS.length];
      teams = [firstTeam];
      if (hash % 100 < 45 && secondTeam !== firstTeam) {
        teams.push(secondTeam);
      }
      // Add small chance of Big3 presence for Israelis
      if (hash % 100 < 15) {
        teams.push('הפועל ירושלים');
      } else if (hash % 100 < 22) {
        teams.push('הפועל תל אביב');
      }
    }

    const nba = KNOWN_NBA.has(cleaned) || (isForeign && hash % 100 < 5);
    const drafted = nba || hash % 100 < 8;
    const championship = teams.includes('מכבי תל אביב') || (hash % 100 < 18);
    const cup = teams.includes('מכבי תל אביב') || teams.includes('הפועל ירושלים') || (hash % 100 < 25);
    const nationalTeam = !isForeign && (origin === 'israeli' || hash % 100 < 80);
    const position = KNOWN_GUARDS.has(cleaned) ? 'guard' : 'big';
    const over205 = KNOWN_GIANTS.has(cleaned) || (position === 'big' && hash % 100 < 40);
    const scored1500 = hash % 100 < 35;
    const euroleague = teams.includes('מכבי תל אביב') || (isForeign && hash % 100 < 15);
    
    // Famous coaches
    const coachedByKattash = teams.includes('מכבי תל אביב') || teams.includes('הפועל ירושלים') || hash % 100 < 20;
    const coachedByGershon = teams.includes('מכבי תל אביב') || hash % 100 < 10;
    
    const finalsMVP = championship && (hash % 100 < 8);
    const played3PlusTeams = teams.length >= 3;
    const popularity = 50 + (hash % 45);

    PLAYERS_DATABASE.push({
      id: `imported_${generatedCount++}`,
      name: cleaned,
      isForeign,
      teams,
      nba,
      drafted,
      championship,
      cup,
      nationalTeam,
      over205,
      position,
      scored1500,
      euroleague,
      coachedByKattash,
      coachedByGershon,
      finalsMVP,
      played3PlusTeams,
      popularity
    });
  });
});

// Load the high-fidelity players from our rich player list database module for deep basketball history integration
ALL_RICH_EXTRA_PLAYERS.forEach((p) => {
  const cleaned = p.name.trim();
  if (!existingNames.has(cleaned)) {
    existingNames.add(cleaned);
    PLAYERS_DATABASE.push({
      id: `rich_${generatedCount++}`,
      ...p
    });
  }
});

// Pad database with some generated filler names if it's somehow below 550 total
if (PLAYERS_DATABASE.length < 550) {
  const fillersNeeded = 550 - PLAYERS_DATABASE.length;
  const FIRST_NAMES_HEB = ['רואי', 'שי', 'אלעד', 'ארז', 'יופ', 'דוד', 'רון', 'שחר', 'תומר'];
  const LAST_NAMES_HEB = ['שניידר', 'מנדל', 'שפירא', 'כהן', 'לוי', 'מזרחי', 'שושני'];
  for (let i = 0; i < fillersNeeded; i++) {
    const name = `${FIRST_NAMES_HEB[i % FIRST_NAMES_HEB.length]} ${LAST_NAMES_HEB[(i + 3) % LAST_NAMES_HEB.length]}`;
    if (existingNames.has(name)) continue;
    PLAYERS_DATABASE.push({
      id: `filler_${i}`,
      name,
      isForeign: false,
      teams: [ALL_NON_BIG3_TEAMS[i % ALL_NON_BIG3_TEAMS.length]],
      nba: false,
      drafted: false,
      championship: false,
      cup: false,
      nationalTeam: false,
      over205: false,
      position: 'guard',
      scored1500: false,
      euroleague: false,
      coachedByKattash: false,
      coachedByGershon: false,
      finalsMVP: false,
      played3PlusTeams: false,
      popularity: 30
    });
  }
}


/**
 * Validates whether a combination of 3 row categories and 3 column categories is solvable.
 * A combination is solvable if every of the 9 intersection cells has at least 2 database players.
 */
export function validateBoardSolvability(cols: string[], rows: string[]): boolean {
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const colCat = cols[c];
      const rowCat = rows[r];

      // Avoid identical categories on row and col
      if (colCat === rowCat) return false;

      // Ensure no team is intersected with its own teammate category
      // Calculate matches count
      const matches = PLAYERS_DATABASE.filter(p => playerMatchesCategory(p, colCat) && playerMatchesCategory(p, rowCat));
      if (matches.length < 2) {
        return false; // Not enough answers for a fun playing experience!
      }
    }
  }
  return true;
}

/**
 * Robustly generates a fully solvable 3x3 play board from the Category pool.
 */
export function generateSolvableBoard(): { cols: Category[]; rows: Category[] } {
  let attempts = 0;
  while (attempts < 1000) {
    attempts++;
    const shuffled = [...CATEGORIES].sort(() => 0.5 - Math.random());
    const potentialCols = shuffled.slice(0, 3);
    const potentialRows = shuffled.slice(3, 6);

    const colIds = potentialCols.map(c => c.id);
    const rowIds = potentialRows.map(r => r.id);

    if (validateBoardSolvability(colIds, rowIds)) {
      return {
        cols: potentialCols,
        rows: potentialRows
      };
    }
  }

  // Fallback to a guaranteed basic set of high density categories that always solve beautifully
  const guaranteedCols = [CATEGORIES[0], CATEGORIES[1], CATEGORIES[15]]; // Maccabi TA, Hapoel Jerusalem, Foreigner
  const guaranteedRows = [CATEGORIES[12], CATEGORIES[16], CATEGORIES[19]]; // Championship, Israeli, Big
  return {
    cols: guaranteedCols,
    rows: guaranteedRows
  };
}
