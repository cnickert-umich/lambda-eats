import { NewFood } from "../food/_types/NewFood"
import { NewMenu } from "../menus/_types/NewMenu"
import { NewShop } from "../shops/_types/NewShop"

export const SHOP_DATA: NewShop = {
    "name": "Bangkok 96 Restaurant",
    "website": "https://bangkok96.com",
    "accountId": "acct_1IZMnwFNEF9eKigW",
    "waitTime": 2700000,
    "address": "2450 South Telegraph Road, Dearborn MI, 48124",
    "email": "bangkok96restaurant@gmail.com",
    "phone": "+1 (313) 730-8161"
}

export const MENU_DATA: NewMenu[] = [
    {
        "description": "Compliments your meal.",
        "title": "Appetizers"
    },
    {
        "description": "All of our soups come with a spicy kick.",
        "title": "Soup"
    },
    {
        "description": "A variety of thai-style dishes packed full of flavor.",
        "title": "Entrees"
    }
]

export const FOOD_DATA: NewFood[] = [
    {
        "cost": 200,
        "description": "Cabbage, carrots, & transparent noodles wrapped in a light dought shell and lightly fried.",
        "title": "Spring Roll (1 PC)"
    },
    {
        "cost": 695,
        "description": "Chilli paste cream cheese with crab meat wrapped in wonton skins. Served with sweet & sour sauce.",
        "title": "Spicy Crab Wontons (5 PCS)"
    },
    {
        "cost": 295,
        "description": "Our famous soup that will warm you up! Includes peas, carrots, bamboo, green onions, & black pepper.",
        "title": "Small Hot & Sour"
    },
    {
        "cost": 595,
        "description": "Our famous soup that will warm you up! Includes peas, carrots, bamboo, green onions, & black pepper.",
        "title": "Large Hot & Sour"
    },
    {
        "cost": 1295,
        "description": "Chicken & shrimp with peas, carrots, eggs, broccoli, cashews, & onions.",
        "title": "Bangkok96 Fried Rice"
    },
    {
        "cost": 1055,
        "description": "Green pepper, onions, & mushrooms in a light chili & herb brown gravy sauce. Served with beef.",
        "title": "Pad Prik (beef)"
    },
    {
        "cost": 1250,
        "description": "Chicken wings with green onions in a brown garlic sauce.",
        "title": "BBQ Wings"
    },
    {
        "cost": 1055,
        "description": "Red curry coconut milk, onions, green pepper, mushrooms, & eggplant. Served with shrimp.",
        "title": "Pad Ped (shrimp)"
    },
    {
        "cost": 1055,
        "description": "Curry with String Beans. Served with chicken.",
        "title": "Pad Prik Khing (chicken)"
    }
]