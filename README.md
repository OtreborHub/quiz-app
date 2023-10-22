# Climate Quiz
quiz-app is a React application written in TypeScript, developed for Start2Impact University. It is available, only in italian language, here: https://climate-quiz.web.app/

The application consists of three main pages:

- Home: This is the initial component. In the Home, we have a brief and friendly introduction and the option to set the difficulty level for the quiz. The available difficulty levels are Easy, Intermediate, and Difficult. Once the quiz is started, the selected level will be passed to the navigation state (see *handleNavigation()*) At the first start, we have only Easy mode available. Passing one level of difficult, a new one will be playable. Going back to home after passing Easy level, give the user a choice between Easy and Intermediate quiz level. Doing it after passing Intermediate level, will give the user a free level choice.

- Quiz: This is the parent component for the Questions and it manages the pagination of questions for both mobile and desktop. It handles click events for answers. Question data is retrieved from a Realtime Database in Firebase (see *db.json*) and managed using the QuizData interface. After each answer is provided, the application displays a new question by changing the index in the QuizData array and passing the data to the child component Question through the QuestionProps interface (see *interfaces.ts*). When the user answers the tenth question, they will be redirected to the Result page. In the state, you will find the selected difficulty level and the score obtained in tenths. It's always possible to return to the previous page by clicking the arrow icon next to the question number.

- Result: This component uses the ResultValue interface and the ResulTitle enum to populate data on the page. Texts related to results and tips are retrieved from the Realtime Database mentioned earlier. While the results are fixed phrases, the tips are selected from a pool of five elements in the database. An exception is made for the tip provided when achieving the maximum score in the difficult level. In this case, the tip will be a motivational message (see *bestResult()*). The component includes four buttons with the following functionalities:

    * Restart the test: Returns to the page served by the Quiz component with the same difficulty level.

    * Next Level: Returns to the page served by the Quiz component with the difficulty level increased by one. This button will not appear upon completing the Difficult level quiz.

    * Share: Copies a message to the clipboard that can be pasted in chat or shared on social media. A setInterval disables the button for about 10 seconds after clicking it.

    * Return to Home: Takes the user back to the initial page.

The project uses the react-router-dom library and implements several useEffect Hooks to initialize components and useState to manage page states.

For simplicity, navigation states are preferred for managing global variables. The style primarily consists of Material UI framework objects with the use of @keyframes for text animations.

To run the project locally, simply download it and execute:
- npm install
- npm start


