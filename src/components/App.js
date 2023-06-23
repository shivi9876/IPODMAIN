// Importing libraries,Stylesheets,components
import '../assets/CSS/App.css';
import '../assets/CSS/screen.css';
import Body from './Body';
import { useEffect,useState } from 'react';
import ZingTouch from 'zingtouch';


// Initializing global variables
let index= 0,
    currentAngle = 0,
    selectItem,
    visibility = true;

// Runs the App
function App() {

  // Initializing the data
  const [list,setList] = useState([
    {
      listItem: "Songs",
      state: true,
      id:0,
    },
  
    {
      listItem: "Settings",
      state: false,
      id:1
    },{
      listItem: "Games",
      state: false,
      id:2
    },
    {
      listItem: "Playlists",
      state: false,
      id:3
    },
    {
      listItem: "Coverflow",
      state: false,
      id:4
    },
  ]);

  // To show the selected options
  let [activeItem, setActiveItem] = useState([]);

  // To use rotate from zingtouch
  useEffect(() => {

    // Choosing the ragion to be monitered
    let buttonWheel = document.getElementById("outer-circle");
    let active = new ZingTouch.Region(buttonWheel);

    // Binding it to rotate 
    active.bind(buttonWheel,'rotate',function(e){
      // Keeping track of the angles
       currentAngle += Math.floor(e.detail.distanceFromLast);
      //  console.log(currentAngle);

      // if clockwise
      if (currentAngle > 3) {
        setList((prevList) => {
          return prevList.map((item) => {
            console.log(currentAngle, index);
            if (item.id === index) {
              return { ...item, state : true };
            } else {
              return { ...item, state : false };
            }
          });
        });
        index++;
        currentAngle = 0;

        // Reached the end of the list
        if(index === list.length){
          index = 0;
        }
        // if anticlockwise
      } else if (currentAngle < -5){
        index--;
        // Reache the begining of the list
        if(index < 0){
          index = list.length;
        }
        setList((prevList) => {
          return prevList.map((item) => {
            if (item.id === index) {
              return { ...item, state: true };
            } else {
              return { ...item, state : false };
            }
          });
        });
        currentAngle = 0;
      }

    },false);
  }, []);

  // For selected a desired options an viewing it
  const handleSelect = () => {
    // Fecting the desired option
    selectItem = list.filter((item) => item.state === true);
    console.log("state ",selectItem);
    const title = selectItem[0].listItem;
    // initializing the desired options 
    if (title === "Songs") {
      setActiveItem({
        ...selectItem,
        src: 'https://i.pinimg.com/236x/14/b1/a7/14b1a7356a1e7e84e96e36eebe417597.jpg',
      });
    } else if (title === "Settings") {
      setActiveItem({
        ...selectItem,
        src: "https://i.pinimg.com/564x/94/e3/33/94e333d76c900410d73cd329e863f72b.jpg",
      });
    } else if (title === "Coverflow") {
      setActiveItem({
        ...selectItem,
        src: "https://i.pinimg.com/564x/fd/80/40/fd8040ffbf2c03ad6d459bd1a0d16610.jpg",
      });
    } else if (title === "Games") {
      setActiveItem({
        ...selectItem,
        src: "https://i.pinimg.com/564x/a5/a2/87/a5a2872bd75b42fe1cf6cdba41a32743.jpg",
      });
    } else if (title === "Playlists") {
      setActiveItem({
        ...selectItem,
        src: "https://i.pinimg.com/564x/a1/a9/d7/a1a9d7616491cbf5c60d8c556b7d3514.jpg",
      });
    }
    visibility = false;
  };

  // Viewing the seleted options
  const handleMenu = () => {
    visibility = true;
    setActiveItem([]);
  };


  return (
    <>
    {/* App Structure */}
    <div className='App'>
      {/* Top section */}
    <div className="screen">
        {/* side-menu section */}
        <div 
        style={!visibility ? { display: "none" } : {}} 
        className="side-menu" >

          {list.map((item) => (
              <li 
              key={item.id} 
              className={item.state ? "active" : ""}>
                {item.listItem}
              </li>
            ))}
        </div>

        {/* display section */}
        <div className="display">
          <h2>{visibility ? "" : activeItem[0].listItem}</h2>
          {activeItem.src && <img src={visibility ? "" : activeItem.src} />}
        </div>
      </div>

      {/* Bottom section */}
      <div className='ipod-actions'>
        <Body handleSelect={handleSelect} handleMenu={handleMenu}/>
      </div>
    </div>
    </>
  );
}

export default App;
