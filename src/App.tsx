import React, { useState, useEffect } from "react";
import './App.css';

interface Book {
  id: number;
  title: string;
  quote: string;
}

const books: Book[] = [
  { id: 1, title: "Common sense 1", quote: "book 1 saying seeing how long this quo 1 saying seeing how long this quote te is blah blah" },
  { id: 2, title: "Book 2", quote: "book 2 quote" },
  { id: 3, title: "Book 3", quote: "Quote sekfjbsd ssfsn dnm dsfdf Book 3" },
  { id: 4, title: "Book 4", quote: "Quote from Book 4" },
];

const shuffleArray = (array: any[]) => {
  let currentIndex = array.length,
      temporaryValue,
      randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

const App = () => {
  const [bookList, setBookList] = useState<Book[]>([]);
  const [quoteList, setQuoteList] = useState<string[]>([]);
  const [selectedBook, setSelectedBook] = useState<number | null>(null);
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null);
  const [matchedBooks, setMatchedBooks] = useState<number[]>([]);
  const [matchedQuotes, setMatchedQuotes] = useState<string[]>([]);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [incorrectMatch, setIncorrectMatch] = useState<boolean>(false);

  useEffect(() => {
    setBookList(books);
    setQuoteList(shuffleArray(books.map((book) => book.quote)));
  }, []);

  const handleBookClick = (bookId: number) => {
    if (selectedBook === bookId) {
      setSelectedBook(null);
    } else {
      setSelectedBook(bookId);
    }
  };

  const handleQuoteClick = (quote: string) => {
    if (selectedBook === null) return;

    setSelectedQuote(quote);

    const book = books.find((book) => book.id === selectedBook);
    if (book && book.quote === quote) {
      setMatchedBooks([...matchedBooks, selectedBook]);
      setMatchedQuotes([...matchedQuotes, quote]);
      if (matchedBooks.length + 1 === books.length) {
        setGameWon(true);
      }
      setIncorrectMatch(false);
    } else {
      setIncorrectMatch(true);
    }

    setTimeout(() => {
      setSelectedQuote(null);
      setSelectedBook(null);
      setIncorrectMatch(false);
    }, 4000);
  };


  const itemStyle = (bgColor: string) => ({
    backgroundColor: bgColor,
    margin: "18px",
    cursor: "pointer"
  });

  const isMatched = (item: number | string, type: "book" | "quote") => {
    if (type === "book") {
      return matchedBooks.includes(item as number);
    } else {
      return matchedQuotes.includes(item as string);
    }
  };

  return (
      <div className="puzzle-container">
        <div className="title">
          <h1>Puzzle Activity -<span>Text sudfjk ahsbdas askd usd.</span></h1>
        </div>
        <div className="option-container">
          <div>
            {bookList.map((book) => (
                <div
                    className="book"
                    key={book.id}
                    onClick={() => handleBookClick(book.id)}
                    style={itemStyle(
                        isMatched(book.id, "book")
                            ? "#78C4C6"
                            : selectedBook === book.id && !incorrectMatch
                                ? "#DBCF8F"
                                : selectedBook === book.id && incorrectMatch
                                    ? "#EFA479"
                                    : "white"
                    )}
                >
                  {book.title}
                </div>
            ))}
          </div>
          <div>
            {quoteList.map((quote, index) => (
                <div
                    className="quote"
                    key={index}
                    onClick={() => handleQuoteClick(quote)}
                    style={itemStyle(
                        isMatched(quote, "quote")
                            ? "#78C4C6"
                            : selectedQuote === quote && !incorrectMatch
                                ? "#DBCF8F"
                                : selectedQuote === quote && incorrectMatch
                                    ? "#EFA479"
                                    : "white"
                    )}
                >
                  {quote}
                </div>
            ))}
          </div>
        </div>
        {gameWon && (
            <div className="button-container" >
              <button className="submit-button">NEXT</button>
            </div>
        )}
      </div>
  );
}

export default App;
