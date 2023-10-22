# Climate Quiz
quiz-app è un applicativo React scritto in Typescript realizzato per Start2Impact University.

L'applicativo è composto da 3 pagine principali:
- Home: questo è il componente iniziale. Nella Home abbiamo una breve introduzione amichevole e la possibilità di settare il livello del quiz che affronteremo. I livelli di difficoltà disponibili sono Facile, Intermedio e Difficile e una volta avviato il quiz, il livello sarà passato nello stato di navigazione (vedi *handleNavigation()*)

- Quiz: componente padre di Question, gestisce l'impaginazione delle domande (Mobile/Desktop) e gestisce gli eventi di click in corrispondenza di una risposta: 
I dati relativi ai quesiti sono recuperati da un Realtime Database di Firebase (vedi *db.json*) e gestiti con l'interfaccia QuizData. 
Ad ogni risposta data, l'applicativo mostrerà un nuovo quesito, 
cambiando l'indice dell'Array di QuizData e passando i dati al figlio Question tramite l'interfaccia QuestionProps (vedi *interfaces.ts*). Al decimo quesito l'utente verrà reindirizzato sulla pagina Result: nello stato troveremo il livello di difficoltà e il punteggio ottenuto in decimi. E' sempre possibile tornare alla pagina precedente con l'icona < posta accanto al numero della domanda.

- Result: componente che utilizza l'interfaccia ResultValue e l'enum ResulTitle per valorizzare i dati in pagina. I testi relativi al risultato e ai suggerimenti sono recuperati dal Realtime Database citato sopra. Mentre i risultati sono frasi fisse, i suggerimenti (Tip) sono pescati da una pool di 5 elementi a DB. Fa eccezione il suggerimento estratto per aver raggiunto il massimo risultato al livello difficile. In questo caso il suggerimento sarà un messaggio motivazionale (vedi *bestResult()*).
Il componente contiene 4 pulsanti con le seguenti funzionalità:
    * Ricominciare il test corrente: torna alla pagina servita dal componente Quiz, con la stessa difficoltà
    * Livello Successivo: torna alla pagina servita dal componente Quiz, con la difficoltà aumentata di un livello. 
    Nota: alla conclusione del quiz a livello Difficile, il pulsante non comparirà.
    * Condividi: copia sulla clipboard un messaggio da poter copiare in chat o condividere sui social. Un setInterval disabilita il pulsante per circa 10 secondi dopo il click.
    * Torna alla Home: riporta l'utente alla pagina iniziale.

Il progetto utilizza la libreria react-router-dom e implementa svariati useEffect Hook per inizializzare i componenti e useState per gestire gli stati della pagina. 

Per semplicitià si è preferito utilizzare gli stati di navigazione come gestione delle variabili globali.
Lo stile è costituito principalmente da oggetti del framework Material UI con l'utilizzo dei @keyframes per le animazioni dei testi.


