# React Coding Agent - Kompleksowe Środowisko Kodowania z WebContainer

## 🇵🇱 Opis po Polsku

Potężne środowisko programistyczne działające w przeglądarce, zbudowane z wykorzystaniem React i technologii WebContainer. Aplikacja zapewnia w pełni funkcjonalne środowisko deweloperskie działające całkowicie w przeglądarce, bez potrzeby wykonywania kodu po stronie serwera.

### Główne Funkcje

- **Wykonywanie Kodu w Przeglądarce**: Uruchamiaj aplikacje Node.js bezpośrednio w przeglądarce za pomocą WebContainer
- **Profesjonalny Edytor Kodu**: Integracja Monaco Editor z podświetlaniem składni, IntelliSense i skrótami klawiszowymi
- **Wbudowany Terminal**: Pełnofunkcjonalny terminal z xterm.js do wykonywania poleceń
- **Zarządzanie Plikami**: Twórz, edytuj i usuwaj pliki oraz foldery za pomocą intuicyjnego eksploratora plików
- **Podgląd na Żywo**: Natychmiastowy podgląd uruchomionych aplikacji
- **Wsparcie Docker**: Łatwe wdrożenie za pomocą Docker i Docker Compose

### Architektura

Aplikacja składa się z trzech głównych komponentów:

1. **Eksplorator Plików**: Przeglądaj i zarządzaj plikami projektu
2. **Edytor Kodu**: Edytuj pliki za pomocą Monaco Editor (ten sam edytor, który zasila VS Code)
3. **Terminal**: Wykonuj polecenia w rzeczywistym środowisku powłoki

Całe wykonywanie kodu odbywa się w instancji WebContainer działającej w przeglądarce, zapewniając bezpieczne i izolowane środowisko.

### Technologie

- **React 18**: Nowoczesny React z hookami
- **WebContainer API**: Środowisko uruchomieniowe Node.js w przeglądarce
- **Monaco Editor**: Profesjonalny edytor kodu
- **Xterm.js**: Emulator terminala
- **Vite**: Szybkie narzędzie do budowania i serwer deweloperski
- **Lucide React**: Piękne ikony
- **Docker**: Konteneryzacja i wdrażanie

---

## 🇬🇧 English Description

A powerful in-browser coding environment built with React and WebContainer technology. This application provides a full-featured development environment that runs entirely in your browser, with no server-side code execution required.

### Key Features

- **In-Browser Code Execution**: Run Node.js applications directly in your browser using WebContainer
- **Professional Code Editor**: Monaco Editor integration with syntax highlighting, IntelliSense, and keyboard shortcuts
- **Built-in Terminal**: Full-featured terminal with xterm.js for running commands
- **File Management**: Create, edit, and delete files and folders with an intuitive file explorer
- **Live Preview**: Instant preview of your running applications
- **Docker Support**: Easy deployment with Docker and Docker Compose

### Architecture

The application consists of three main components:

1. **File Explorer**: Browse and manage project files
2. **Code Editor**: Edit files with Monaco Editor (the same editor that powers VS Code)
3. **Terminal**: Execute commands in a real shell environment

All code execution happens in a WebContainer instance running in your browser, providing a safe and isolated environment.

### Technologies Used

- **React 18**: Modern React with hooks
- **WebContainer API**: Browser-based runtime for Node.js
- **Monaco Editor**: Professional code editor
- **Xterm.js**: Terminal emulator
- **Vite**: Fast build tool and dev server
- **Lucide React**: Beautiful icons
- **Docker**: Containerization and deployment

---

## 📋 Wymagania / Prerequisites

- Node.js 18 or higher
- npm or yarn
- Docker and Docker Compose (for containerized deployment)
- Modern browser with SharedArrayBuffer support (Chrome 92+, Edge 92+, or Firefox 95+)

## 🚀 Szybki Start / Quick Start

### Rozwój Lokalny / Local Development

1. Przejdź do katalogu coding-agent / Navigate to the coding-agent directory:
```bash
cd coding-agent
```

2. Zainstaluj zależności / Install dependencies:
```bash
npm install
```

3. Uruchom serwer deweloperski / Start the development server:
```bash
npm run dev
```

4. Otwórz przeglądarkę / Open your browser to `http://localhost:3000`

### Wdrożenie Docker / Docker Deployment

Z katalogu głównego repozytorium / From the repository root:

1. Zbuduj i uruchom kontener / Build and start the container:
```bash
docker compose up -d
```

2. Uzyskaj dostęp do aplikacji / Access the application at `http://localhost:8080`

3. Zatrzymaj kontener / Stop the container:
```bash
docker compose down
```

## 🎮 Użytkowanie / Usage

### Tworzenie Plików i Folderów / Creating Files and Folders

1. Kliknij ikonę pliku lub folderu w nagłówku eksploratora plików
2. Wprowadź nazwę i naciśnij Enter lub kliknij Utwórz
3. Nowy element pojawi się w drzewie plików

### Edycja Kodu / Editing Code

1. Kliknij dowolny plik w eksploratorze plików, aby otworzyć go w edytorze
2. Wprowadź zmiany
3. Zapisz za pomocą `Ctrl+S` (lub `Cmd+S` na Mac) lub kliknij przycisk Zapisz

### Uruchamianie Poleceń / Running Commands

Użyj terminala do uruchamiania dowolnych poleceń Node.js:

- `npm install <package>` - Zainstaluj pakiety / Install packages
- `node index.js` - Uruchom kod / Run your code
- `npm start` - Uruchom skrypt start / Run the start script
- `ls` - Lista plików / List files
- `cat <filename>` - Zobacz zawartość pliku / View file contents

### Przeglądanie Wyników / Viewing Output

Gdy uruchomisz serwer WWW (jak przykład w `index.js`), kliknij przycisk "Open Preview" w nagłówku, aby zobaczyć swoją aplikację w nowej karcie.

## 🔒 Bezpieczeństwo / Security

WebContainer działa w bezpiecznym, piaskownicy środowisku w przeglądarce. Całe wykonywanie kodu jest izolowane i nie może uzyskać dostępu do lokalnego systemu plików ani sieci poza tym, co jest wyraźnie dozwolone.

Aplikacja wymaga tych nagłówków do funkcjonowania:
- `Cross-Origin-Embedder-Policy: require-corp`
- `Cross-Origin-Opener-Policy: same-origin`

Są one automatycznie skonfigurowane zarówno na serwerze deweloperskim (Vite), jak i w wdrożeniu produkcyjnym (Nginx).

## 🏗️ Struktura Projektu / Project Structure

```
coding-agent/
├── src/
│   ├── components/
│   │   ├── CodeEditor.jsx    # Wrapper Monaco editor
│   │   ├── FileExplorer.jsx  # Nawigacja po drzewie plików
│   │   └── Terminal.jsx      # Emulator terminala
│   ├── utils/
│   │   └── webcontainer.js   # Inicjalizacja WebContainer
│   ├── styles/
│   │   └── index.css         # Style globalne
│   ├── App.jsx               # Główny komponent aplikacji
│   └── main.jsx              # Punkt wejścia aplikacji
├── public/                   # Zasoby statyczne
├── Dockerfile               # Konfiguracja budowania Docker
├── nginx.conf              # Konfiguracja Nginx
├── vite.config.js          # Konfiguracja Vite
└── package.json            # Zależności i skrypty
```

## 🧩 Dostosowywanie / Customization

### Modyfikacja Domyślnych Plików / Modifying Default Files

Edytuj `src/utils/webcontainer.js`, aby zmienić domyślne pliki tworzone podczas uruchamiania aplikacji.

### Zmiana Motywów / Changing Themes

Motyw edytora Monaco można zmienić w `src/components/CodeEditor.jsx`, modyfikując właściwość `theme`.

### Dodawanie Wsparcia dla Języków / Adding Language Support

Dodaj nowe mapowania języków w funkcji `getLanguage` w `src/components/CodeEditor.jsx`.

## 🐛 Rozwiązywanie Problemów / Troubleshooting

### WebContainer nie chce się zainicjalizować / WebContainer won't initialize

- Upewnij się, że używasz nowoczesnej przeglądarki (Chrome 92+, Edge 92+, lub Firefox 95+)
- Sprawdź, czy witryna jest obsługiwana z odpowiednimi nagłówkami COOP/COEP
- Poszukaj błędów w konsoli, aby uzyskać więcej szczegółów

### Pliki nie zapisują się / Files not saving

- Sprawdź konsolę przeglądarki pod kątem błędów
- Upewnij się, że WebContainer został w pełni zainicjalizowany (wskaźnik ładowania powinien zniknąć)

### Terminal nie odpowiada / Terminal not responding

- Spróbuj odświeżyć stronę, aby ponownie zainicjalizować WebContainer
- Sprawdź, czy piszesz w obszarze terminala (kliknij, aby skupić)

## 📸 Zrzuty Ekranu / Screenshots

![Loading State](https://github.com/user-attachments/assets/f94b664a-6684-4ad9-ac02-5cffc21610ec)
*Stan ładowania aplikacji podczas inicjalizacji WebContainer / Application loading state during WebContainer initialization*

## 🤝 Wkład / Contributing

To jest część repozytorium [Awesome GitHub Copilot](https://github.com/github/awesome-copilot). Wkłady są mile widziane!

## 📄 Licencja / License

Licencja MIT - szczegóły w repozytorium nadrzędnym / MIT License - see the parent repository for details.

## 🙏 Podziękowania / Acknowledgments

- Zbudowane z [WebContainer API](https://webcontainers.io/) przez StackBlitz
- Używa [Monaco Editor](https://microsoft.github.io/monaco-editor/) przez Microsoft
- Terminal zasilany przez [Xterm.js](https://xtermjs.org/)

---

**Uwaga**: Ta aplikacja wymaga środowiska przeglądarki, które obsługuje SharedArrayBuffer. Nie będzie działać w środowiskach, w których te nagłówki bezpieczeństwa nie mogą być ustawione.

**Note**: This application requires a browser environment that supports SharedArrayBuffer. It will not work in environments where these security headers cannot be set.
