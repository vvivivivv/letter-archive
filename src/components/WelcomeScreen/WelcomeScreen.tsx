import './WelcomeScreen.css'

export function WelcomeScreen(){
    return (
        <div className="welcome-container">

            <div className="hearts-container">
                {Array.from({length: 10}).map((_, index) => (
                    <div key={index} className="heart">❤️</div>
                    ))}
            </div>

            <h1 className="welcome-title">
                Happy Anniversary bb
            </h1>

            <button className="begin-button">
                Click
            </button>
        </div>
    );
};