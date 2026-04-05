import * as fs from "fs";
import * as readline from "readline";

const FILE = "books.json";

type Book = {
    title: string;
    author: string;
};

let books: Book[] = [];

// Загрузка данных
if (fs.existsSync(FILE)) {
    const data = fs.readFileSync(FILE, "utf-8");
    books = JSON.parse(data);
} else {
    console.log("Файл не найден. Создан новый список книг.");
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function showMenu(): void {
    console.log("\nМеню:");
    console.log("1. Показать все книги");
    console.log("2. Добавить книгу");
    console.log("3. Удалить книгу");
    console.log("4. Выход");

    rl.question("Выберите действие: ", handleMenu);
}

function handleMenu(choice: string): void {
    switch (choice) {
        case "1":
            showBooks();
            break;
        case "2":
            addBook();
            break;
        case "3":
            deleteBook();
            break;
        case "4":
            saveAndExit();
            break;
        default:
            console.log("Неверный выбор.");
            showMenu();
    }
}

function showBooks(): void {
    if (books.length === 0) {
        console.log("Список книг пуст.");
    } else {
        console.log("\nСписок книг:");
        books.forEach((book, index) => {
            console.log(
                `${index + 1}. Название: ${book.title}, Автор: ${book.author}`
            );
        });
    }

    showMenu();
}

function addBook(): void {
    rl.question("Введите название книги: ", (title) => {
        rl.question("Введите автора книги: ", (author) => {
            books.push({ title, author });

            console.log("Книга добавлена.");
            showMenu();
        });
    });
}

function deleteBook(): void {
    showBooks();

    rl.question("Введите номер книги для удаления: ", (num) => {
        const index = parseInt(num) - 1;

        if (index >= 0 && index < books.length) {
            books.splice(index, 1);
            console.log("Книга удалена.");
        } else {
            console.log("Неверный номер.");
        }

        showMenu();
    });
}

function saveAndExit(): void {
    fs.writeFileSync(FILE, JSON.stringify(books, null, 2));
    console.log("Данные сохранены.");
    console.log("Выход...");
    rl.close();
}

showMenu();