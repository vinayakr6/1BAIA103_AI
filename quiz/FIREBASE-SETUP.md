# 1BAIA103 Quiz Portal — Phase 1

## Firebase Spark setup

1. Open Firebase Console: https://console.firebase.google.com/
2. Create a Firebase project.
3. Add a Web App under Project Settings.
4. Copy the Web SDK configuration into `js/firebase-config.js`.
5. Enable Firestore Database.
6. Enable Authentication → Email/Password for future faculty login.
7. Publish `firestore.rules` in Firestore → Rules.
8. Copy this entire `quiz` folder into your GitHub Pages project as `1BAIA103_AI/quiz/`.

## Important

The Firebase Web config belongs in the frontend. Do NOT upload a Firebase service-account JSON, Admin SDK private key, or other server credentials.

The Phase 1 rules are starter rules. They deliberately prevent quiz writes from the student page.

Do not put `correct_answer` in question documents readable by students. A browser-based scoring version is suitable for ordinary classroom practice but is not tamper-proof. A high-stakes exam should use trusted server-side scoring.

## Firestore collections

- `quizzes`
- `quizzes/{quizId}/questions`
- `students`
- `attempts`
- `faculty`

## Expected quiz metadata

Example `quizzes/Q001`:
- `title`: "Class Quiz 01"
- `module`: "Module 1"
- `class`: "Class 01"
- `durationMinutes`: 15
- `status`: "active"
- `questionCount`: 10
- optional `startAt` / `endAt` Firestore timestamps

Phase 2 will add the complete student quiz engine, timer, question navigation and submission workflow.
