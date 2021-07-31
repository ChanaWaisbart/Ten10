data = {}
data.products = [
    {
        id: 1,
        productName: "בוגבו בי5 קורל",
        productDetails: "העגלות האיכותיות והמתקדמות ביותר.עיצוב ייחודי המספק סטייל ונוחות לחוויית ניידות מושלמת.נוחות מירבית.עיצוב ייחודי.נסיעה חלקה ונעימה.תקני בטיחות מחמירים.",
        productImage: "./images/bugabooo.gif",
        amountOrdered: 0,
        price: 3200
    },
    {
        id: 2,
        productName: "ארון לחדר ילדים",
        productDetails: "ארון איכותי מאד בעל תכולה וחלוקה נוחה של המדפים.אחריות ל3 שנים",
        productImage: "./images/cupboard.jpg",
        amountOrdered: 0,
        price: 3500
    },
    {
        id: 3,
        productName: "מיקסר KENWOOD KMIX PICSSO",
        productDetails: "מיקסר מקצועי מסדרת היוקרה KENWOOD KMIX PICSSO מנוע חדש משופר וחזק 1000 וואט",
        productImage: "./images/kenwood.jpg",
        amountOrdered: 0,
        price: 1200
    },
    {
        id: 4,
        productName: "פליימוביל בית בובות ענק",
        productDetails: "בית בובות ענק ומדהים הכולל 2 דמויות, אביזרים לעיצוב הבית, מדבקות, מדשאות ועוד הרבה!",
        productImage: "./images/playmobil.jpg",
        amountOrdered: 0,
        price: 450
    },
    {
        id: 5,
        productName: "ערכת מוצרים אולמיטיבית לטיפוח השיער",
        productDetails: "ערכת מוצרים אולמיטיבית לטיפוח השיער | 4 מוצרים שמפו 750 מל, מסכה 500 מל, סרום 120 מל, ספריי טיפולי 250 מל",
        productImage: "./images/Haircare(2).jpg",
        amountOrdered: 0,
        price: 180
    },
    {
        id: 6,
        productName: "סט מחליקי שיער דו קירמי",
        productDetails: "סט מחליקי שיער מבית CORTEX, לעיצוב השיער בקלות + Cortex Duo קורטקס מיני לטיולים",
        productImage: "./images/Hairstraightener(1).jpg",
        amountOrdered: 0,
        price: 200
    },
    {
        id: 7,
        productName: "שעון רולקס דייגאסט",
        productDetails: "הדגמים החדשים של הדייטג'אסט 36 מצוידים בקליבר 3235, מנגנון בחזית טכנולוגיית השענות. בדומה לכל השעונים של רולקס, הסאבמרינר 36 קיבל את הסמכת Superlative Chronometer, המבטיחה ביצועים גבוהים על פרק כף היד.",
        productImage: "./images/rolex.jpg",
        amountOrdered: 0,
        price: 20000
    },
    {
        id: 8,
        productName: "שעון יד מוזהב אנלוגי מבית Timex",
        productDetails: "שעון יד לאישה מבית TIMEX גוף השעון עשוי פליז מוזהב רצועת מש פלדת אל חלד נוחה לשימוש מנגנון QUARTZ אנלוגי אמין ומדויק ",
        productImage: "./images/Woman's watch (1).jpg",
        amountOrdered: 0,
        price: 200
    },
    {
        id: 9,
        productName: "כורסה מפנקת מבית LEONARDO",
        productDetails: "כורסת קלאסיק הינה כורסה מפנקת בעלת ריפוד בד רחיץ, עבה ואיכותי.היא מרווחת וכוללת כמובן ריקליינר.מבית LEONARDO ",
        productImage: "./images/loungechair.jpg",
        amountOrdered: 0,
        price: 1100
    },
    {
        id: 10,
        productName: "סט שולחן עמיד ושיקי מבית KETER",
        productDetails: "סט מלודי הוא פתרון נהדר לארוחה קלה בגינה בימי השמש הנעימים השולחן והכסאות האיכותיים, שעמידים בפני פגעי מזג האוויר כולל פתח מתאים לשמשייה גדולה, להגנה בימים החמים ",
        productImage: "./images/GardenFurniture.jpg",
        amountOrdered: 0,
        price: 700
    },
    {
        id: 11,
        productName: "מסלול ריצה מקצועי מבית VO2 דגם",
        productDetails: "להיות הכי מהיר!!! מסלול ריצה מקצועי מבית VO2 9 תכניות אימון + תכנית ידנית.שיפוע מכני 3 מצבים.",
        productImage: "./images/treadmill.jpg",
        amountOrdered: 0,
        price: 1200
    }
]

data.users = [
    {
        isManager: true,
        id: "1",
        userName: "chani",
        password: "tenearn1010",
        email: "ten10.earn10@gmail.com",
        address: "הריף 4",
        phone: "052716666"
    },
    {
        isManager: false,
        id: "2",
        userName: "Lali",
        password: "12345678p",
        email: "chani9536@gmail.com",
        address: "הריף 4",
        phone: "0527177777"
    }
]

data.orders = [
    {
        id: "1",
        userId: "1",
        orders: [],
    },
    {
        id: "2",
        userId: "2",
        orders: [],
    }
]

module.exports = data