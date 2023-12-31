להפעלת הפרויקט :

1. יש לפתוח את קובץ הHackerU-Project.sln בvs כדי שהשרת יפעל.
2. יש להריץ npm start על תקיית react-ui.
3. את הconnection string יש להטמיע בקובץ appsettings.Development.json שנמצא בתוך קובץ appsettings.json.

פרויקט הגמר שלי - שניר אגי

אני שניר אגי , למדתי באהקריו בקורס .NET פיתוח תוכנה , בקורס רכשנו המון ידע מעולם הFull Stack.
בקורס חווינו המון ולמדנו המון בין אם זה משימות קטנות ובין אם זה פרויקטים גדולים.
הפרויקט הזה בעצם מתמצת ומספר את כל הדרך שעברנו וכל מה שלמדנו מעולם הפיתוח תכונה.
את הפרויקט שלי בחרתי להציג לדעתי בצורה הכי ריאליסטית שאפשר , הפרויקט שלי הוא בעצם חנות אינטרנטית.
האמנם זה נשמע פרויקט שהוא יחסית בנאלי אך חשוב לי להסביר שכל דבר ודבר נעשה במחשבה עמוקה ותכנון נכון.

הפרויקט שלי בעצם הוא פרויקט Full stack שמתבסס בצד שרת על API שמתממשק לממסד נתונים ובעזרת קריאות Http מחזיר אובייקטים שמתקבלים בצד לקוח ומוצגים בחנות שבנויה באמצעות React.

צד שרת -
הצד שרת של הפרויקט שלי בנוי בעזרת API שמתממשק לממסד נתונים ומעלה אליו נתונים ראשוניים בעזרת Migrations.
יש לי Controllers לכל אובייקט שאפשר לעשות לו פעולות CRUD פשוטות ולאובייקטים מסויים פעולות יותר מורכבות במידת הצורך.
לדוגמה , בController של אובייקט Login צריך לבצע פעולת ולידציה ולהחזיר למשתמש Token שבעזרתו הוא נכנס לאתר וככה אפשר לזהות את פרטיו.
האובייקטים מקושרים בעזרת מפתחות , לדוגמה יש אובייקט Order ויש אובייקט User , בשביל שיהיה אפשר לקשר הזמנה ללקוח מסוים מוסיפים לOrder userID וככה אפשר לקשר ביניהם ( פעולה הנקראת JOIN ).
עוד משהו שחשוב לי להציד בצד שרת הוא העלאת אובייקט Product , אנו יודעים שאובייקט מסוג זה מצריך תמונה , אז מה שאני בחרתי לעשות מתוך מחשבה קדימה הוא לאחסן את התמונה עצמה בAPI ואת הכתובת בממסד נתונים ובכך קריאה של אובייקט תהיה יעילה יותר ובנוסף זה חוסך משקל בממסד נתונים.

צד לקוח -
צד לקוח הוא החלק הנראה לעיין והיותר מסובך מבחינת כתיבה מבחינה שאפשר להשתמש בקיראה אחת מהAPI בכמה וכמה קומפוננטות שונות ומגוונות.

קומפוננטות -

Login , קומפוננטה זו דורשת שם משתמש וסיסמה ובכך שולחת את אותם פרמטרים לAPI שבודק אם קיים משתמש כזה בממסד נתונים , במידה וכן אותו משתמש מקבל Token , פרטיו נשמרים בLocal Storage , וניתנת לו גישה מלאה לאתר , לדוגמה ביצועה הזמנות ובמידה והוא מנהל גישה לאיזור הBack Office , במידה ומתמש לא רשום יש אפשרות של הרשמה ( Sign Up ) שבעצם עושה קריאת POST בAPI ויוצרת משתמש.

Header , יצרתי Context שקורא פעם אחת לקטגוריות אלא אם כן יש שינוי בקטגוריות על מנת לא לגרום לעומס על השרת ומתוך מחשבה שברוב המקרים שמשתמש רגיל גולש באתר לא ישתנו קטגוריות , בHeader יש לינקים שבעצם מעבירים אותנו לדף שאנו רוצים להגיע , הוא נמצא בכל האתר בראש העמוד.
באיזור זה ניתן למצוא את קומפוננטת הLogin ואת סל הקניות.

Cart , היא קומפוננטה המכילה מערך הנמצא בLocal storage שאליו מוסיפים מוצרים בעזרת כפתור הנמצא בכרטיסית המוצר ודרכו המשתמש יכול לבצע הזמנה באתר , המוצרים עוברים בגוף של הקריאה ביחד עם פרטי המשתמש ובעזרת זה נוצרת הזמנה עם פריטים שמשוייכת לאותו משתמש.

Search Bar , זו קומפוננטה הנמצאת בדף הProducts , המשתמש מעביר מילת חיפוש והקומפוננטה עושה פילטור למוצרים ובעזרת מילה זו מציגה למתמש את המוצרים לפי מילת החיפוש שהזין.

Side Panel , היא קומפוננטה המוצגת באיזור הBack Office ובעזרת משתנה התצוגה , זה בעצם תפריט ניווט לאיזור זה.

Footer , קומפוננטה זו מוצגת בתחתית האתר בכולו ובה נמצאים דרכי קישור אליי בכל המדיות החברתיות.

דפים -

Back office , שם מגיע מי שצריך ואיזור זה מוגן באמצעות קומפוננטה הנקראת Protected שתפקידה הוא לבדוק את הToken של אותו משתמש ובמידה ונמצא שהוא מנהל ניתנת לו הגישה , אך ורק מי שמוגדר מנהל יכול לתת הרשאה זו למשתמשים אחרים , באיזור זה מימשתי את כל הפעולות שלמעשה בניתי בAPI.
באיזור זה יש אפשרויות מגוונות לדוגמא להוסיף מוצרים , לערוך מוצרים , לתת הרשאות , להוסיף קטגוריות וכו'.
באיזור זה הפעולות נעשות ישירות מול הAPI על מנת לתת את המידע הכי עדכני.

Products , דף זה הוא האיזור היותר מעניין , איזור זה הוא דף יחיד שבעצם מציג לנו את כל המוצאים בצורה מפולחת , הוא מפעיל Context שמביא מהAPI את כל המוצרים ובהתאם ללינק שעליו לחצנו בHeader הוא יודע איזה קטגוריה של מוצרים להציג , הוא מקבל את הCategory ID דרך הלינק ובכך נוצר המיפוי של המוצרים , המיפוי משתנה ברגע שמתחלפת קטגוריה ובכך זה נראה כמה דפים נפרדים.
בדף זה יש אפשרויות מגוונות כגון , למיין את המוצרים , שורת חיפוש שמחפשת מוצרים מתוך הקטגוריה בה אנו נמצאים ובכל כרטיסיה של מוצר יש אפשרות להוסיף לסל הקניות ולהגיע לדף מוצר.

Product Details , זה דף שאליו מגיעים באמצעות לחיצה על כפתור הנמצא בכרטיסית המוצר והוא מציג במפורט את הפרטים על אותו מוצר בעזרת קריאה למוצר מהAPI לפי הProduct ID.

לסיכום -
האתר נבנה במחשבה עמוקה והשקעה רבה בין אם זה בעיצוב ובין אם זה בניקיון הקוד , כתיבה נכונה וברורה.
אשמח לשמוע ביקורות טובות ופחות טובות למתן הערכה על ההשקעה ויותר מזה למען שיפור ולמידה.
תודה רבה.
