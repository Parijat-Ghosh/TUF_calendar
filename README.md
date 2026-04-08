# 📅 Interactive Wall Calendar Component

A premium, interactive calendar component inspired by a real-world wall calendar. This project focuses on delivering a **clean UI, smooth UX, and production-level frontend architecture** using modern web technologies.

---

## 🚀 Live Demo

👉 https://tuf-calendar-zr77-ajlwueqo9-parijat-ghoshs-projects.vercel.app/

---

## 🎥 Demo Video

👉 https://drive.google.com/file/d/1jUMSF3kxMs1E9uPvGCUw5LQN8ucZSx6_/view

---

## 🧠 Project Overview

This project was built as part of a frontend engineering challenge to transform a **static calendar design into a fully interactive web application**.

It demonstrates:

* Strong component architecture
* Thoughtful state management
* Real-world UX design decisions
* Clean and scalable frontend practices

---

## 🖼️ UI Preview

### 📆 Calendar View

![Calendar View](./screenshots/calendar-view.png)

### 📝 Notes Creation (Date Range)

![Notes Creation](./screenshots/notes-creation.png)

### 🔍 Notes Retrieval (Modal View)

![Notes Retrieval](./screenshots/notes-retrieval.png)

---

## ✨ Features

### 📆 Interactive Date Range Selection

* Click-based range selection (start → end)
* Visual distinction for:

  * Start date
  * End date
  * In-range dates
* Intelligent range reset behavior

---

### 📝 Persistent Notes System

* Notes tied to **selected date ranges**
* Structured data:

  * Title
  * Content
* Auto-load notes on re-selection
* Data persistence using **localStorage**

---

### 🎨 Wall Calendar UI Design

* Inspired by physical wall calendars
* Dedicated **hero image section**
* Clean layout with strong visual hierarchy
* Minimal, modern design system

---

### 📱 Fully Responsive Layout

* Desktop: Multi-panel layout (image + calendar + notes)
* Mobile: Stacked layout with touch-friendly interactions
* Seamless responsiveness across devices

---

### ✨ UX Enhancements

* Smooth animations using Framer Motion
* Hover and click feedback
* Modal-based note viewing
* Clear empty and active states

---

## 🛠 Tech Stack

| Category  | Technology    |
| --------- | ------------- |
| Framework | React (Vite)  |
| Language  | TypeScript    |
| Styling   | Tailwind CSS  |
| Animation | Framer Motion |
| Storage   | localStorage  |

---

## 🧱 Project Architecture

```bash
/src
  /components
    CalendarGrid.tsx
    DayCell.tsx
    Header.tsx
    ImageSection.tsx
    NotesPanel.tsx
    NoteModal.tsx
  /assets
  App.tsx
  main.tsx
  utils.ts
  types.ts
```

---

## ⚙️ Core Logic

### 📆 Date Range Selection

* First click → start date
* Second click → end date
* Automatically calculates intermediate range
* Supports hover-based preview

---

### 💾 Notes Storage Strategy

* Notes stored using browser `localStorage`
* Key format:

```json
{
  "2026-01-05_to_2026-01-10": {
    "title": "Trip",
    "content": "Goa trip with friends"
  }
}
```

* Ensures persistence without backend
* Optimized for simplicity and performance

---

## 🎯 Engineering Decisions

* Chose **localStorage** over backend to align with frontend-only scope
* Modular component design for scalability
* Minimal state complexity with clear separation of concerns
* Focused on UX-first development approach
* Avoided unnecessary dependencies

---

## 🧪 Running Locally

```bash
git clone https://github.com/Parijat-Ghosh/TUF_calendar
cd TUF_calendar/calendar
npm install
npm run dev
```

---

## 📌 Future Enhancements

* Note indicators on calendar cells
* Dark / Light theme support
* Drag-to-select date ranges
* Holiday & event markers
* Cloud sync (backend integration)

---

## 🙌 Acknowledgment

This project was developed as part of a frontend engineering task by takeUforward.

---

## 📬 Contact

* **Parijat Ghosh**
* GitHub: https://github.com/Parijat-Ghosh

---

⭐ If you found this project interesting, consider giving it a star!
