// Importing Stylesheet
import '../assets/CSS/body.css'

function Body ({handleMenu,handleSelect}){
    // bottom section
        return(
            // Touch area
            <div id="outer-circle">
                {/* To back out from the selected option */}
                <button id='menu'  onClick={handleMenu}>
                    Menu
                </button>

                <button id='forward'>
                    <i className="fa-solid fa-forward-fast" ></i>
                </button>

                <button id='back'>
                <i class="fa-solid fa-forward-fast fa-rotate-180"></i>
                </button>

                <button id='play-pause'>
                    <i className="fa-solid fa-play"></i>
                    <i className="fa-solid fa-pause"></i>
                </button>
                {/* select button */}
                <div id = "inner-circle" onClick={handleSelect}>
                </div>
            </div>
        )
}

export default Body;