/// უჯრები
const boxes = document.querySelectorAll(".box");
//// სტატუსის მაჩვენებელი ტექსტი
const statusTxt = document.querySelector("#result");
//<> რესტარტის ღილაკი
const restartBtn = document.querySelector("#playAgain");
/// მოგების კომბინაციები
const win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
//// ასარჩევი ყუთების ვარიანტები (რაოდენობა 9)
let options = ["", "", "", "", "", "", "", "", ""];
//<> ამჟამინდელი მოთამაშე
let currentPlayer = "X";
//* მიმდინარეობს თუ არა თამაში (default = არა)
let running = false;
//! გამოძახებული დაწყების ფუნქცია
initializeGame();
//! დაწყების ფუნქცია
function initializeGame() {
  //| event listener-ის გამოყენებით, ყუთზე დაკლიკებისას გაეშვება ფუნქცია boxClicked
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
  /// event listener-ის გამოყენებით, რესტარტის ღილაკზე დაკლიკებისას გაეშვება restartGame ფუნქცია
  restartBtn.addEventListener("click", restartGame);

  running = true;
}
//| უჯრაზე დაკლიკების ფუნქცია
function boxClicked() {
  //* უჯრის ინდექსის მიღება
  const boxIndex = this.getAttribute("boxIndex");
  //! თუ უჯრის ინდექსი არ არის ცარიელი ან თამაში არაა გაშვებულია
  if (options[boxIndex] != "" || !running) {
    //! არ დააბრუნებს არაფერს
    return;
  }
  //! სხვა შემთხვევაში გამოიძახება updateBox ფუნქცია
  //! და არგუმენტებადა გადაეცემა this და boxIndex-ები
  updateBox(this, boxIndex);
  checkWinner();
}
//* X-ის და O-ის დამატების ფუნქცია
function updateBox(box, index) {
  //* placeholder-ების განახლება
  options[index] = currentPlayer;
  //* უჯრაში დაემატება შესაბამისი მოთამაშის მიერ დაკლიკების შემდგომ
  //* შესაბამისი სიმბოლო (X ან O)
  box.textContent = currentPlayer;
}

function changePlayer() {
  //\ თუ მიმდინარე მოთამაშე (currentPlayer) არის "X" მაშინ მისი სვლის შემდეგ
  //\ currentPlayer-ი შეიცვლება "O"-ით ხოლო სხვა შემთხვევაში ისევ "X"-ით

  //\ სტატუსი განახლდება ყოველ სვლაზე და turn-box-ის background შეიცვლება
  //\ აქტიური მოთამაშის მიმართ
  if (currentPlayer === "X") {
    currentPlayer = "O";
    document.querySelector(".turn-bg").style.left = "100px";
  } else {
    currentPlayer = "X";
    document.querySelector(".turn-bg").style.left = "0";
  }
}

//// მოგებულის შემოწმება
function checkWinner() {
  let roundWon = false;
  //// გადაუყვება ყველა მოგების შესაძლებლობას

  for (let i = 0; i < win.length; i++) {
    //// იღებს ახლანდელ (კონკრეტულ ინდექსზე მყოფ) მოგების შესაძლებლობას
    const condition = win[i];
    //// ინახავენ 0, 1 და 2 ინდექსებზე მყოფ მნიშვნელობებს
    const boxA = options[condition[0]];
    const boxB = options[condition[1]];
    const boxC = options[condition[2]];
    //// თუ რომელიმე უჯრა მაინც არის ცარიელი უბრალოდ
    //// გაგრძელდეს პროგრამა
    if (boxA == "" || boxB == "" || boxC == "") {
      continue;
    }
    //// ამოწმებს თუ სამივე უჯრას აქვს იგივე მნიშვნელობა
    if (boxA == boxB && boxB == boxC) {
      roundWon = true;
      break; /// for loop-ს აჩერებს რადგან გამარჯვებული ნაპოვვნია
    }
  }
  /// თუ ვინმემ გაიმარჯვა ანახლებს სტატუსს
  if (roundWon) {
    statusTxt.textContent = `${currentPlayer} wins!`;
    running = false;
    /// ფრეზეც იგივე
  } else if (!options.includes("")) {
    statusTxt.textContent = "Draw!";
    running = false;
    /// გრძელდება თამაში სვლა გადადის მეორე მოთამაშეზე
  } else {
    changePlayer();
  }
}

function restartGame() {
  currentPlayer = "X"; //<> იწყებს ისევ X
  options = ["", "", "", "", "", "", "", "", ""];
  //<> ყველა უჯრას აბრუნებს საწყისად (ცარიელად)
  boxes.forEach((box) => (box.textContent = ""));

  running = true;
  ///<> turn-box-ის background იცვლება დამწყების მიმართ
  document.querySelector(".turn-bg").style.left = "0";

  statusTxt.textContent = "";
}
