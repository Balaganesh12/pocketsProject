import { HiOutlineLightningBolt } from 'react-icons/hi'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { AiOutlineMessage } from 'react-icons/ai'
import { FiSearch } from 'react-icons/fi'
import { CiMail } from 'react-icons/ci'
// import { NotificationBar } from '../pages/NotificationBar/NotificationBar'
// import CreateAcc from '../pages/Help/CreateAcc'






export const HelpPage: React.FC = () => {

    let howTCAcontainer=true;
function HowTCA() {
    if (howTCAcontainer) {
        document.getElementById("howTCAcontainer").style.display = "block";
        document.getElementById("helpCOntainer").style.position = "fixed";
        howTCAcontainer=false;        
    }
    else{
        document.getElementById("howTCAcontainer").style.display = "none";
        document.getElementById("helpCOntainer").style.position = "static";
        howTCAcontainer=true;     
    }
  }

    return (
        <>
            <div className="helpCOntainer" id='helpCOntainer'>
                <h1 className='wellcomMsg'>How we can help you?</h1>
                {/*                 
                <div className="search">
				<form className="search-form">
					<input type="text" placeholder="Search for books, authors, categories and more..">
					<input type="submit" value="Submit">
				</form>
			</div> */}

                <div className="search">
                    <form className="search-form">
                        <input type="text" />
                        <button><FiSearch style={{ fontSize: "30px" }} /></button>
                    </form>
                </div>

                {/* <div className="searchBar">
                    <input type="search"></input>
                    <button id='searchIcon'><FiSearch/></button>
                </div> */}
                <div className="tickets">
                    <ul>
                        <li id="ticketTag" className='centeringLists'><span className='centeringLists iconThunder'><HiOutlineLightningBolt /></span>Popular Tickets</li>
                        <li className='centeringLists'><span className='centeringLists iconList'><MdKeyboardArrowRight /></span><span onClick={HowTCA} id="HowTCA">How to create a account?</span></li>
                        <li className='centeringLists'><span className='centeringLists iconList'><MdKeyboardArrowRight /></span>Before submitting the tickets</li>
                        <li className='centeringLists'><span className='centeringLists iconList'><MdKeyboardArrowRight /></span>What admin theme does?</li>
                        <li className='centeringLists'><span className='centeringLists iconList'><MdKeyboardArrowRight /></span>How to change slider transition time</li>
                    </ul>
                    
                </div>
                <div className="faq">
                    <ul>
                        <li id="faqTag" className='centeringLists'><span className='centeringLists iconFaq'><AiOutlineMessage /></span>FAQ</li>
                        <li className='centeringLists'><span className='centeringLists iconList'><MdKeyboardArrowRight /></span>How to create a account?</li>
                        <li className='centeringLists'><span className='centeringLists iconList'><MdKeyboardArrowRight /></span>How to change password?</li>
                        <li className='centeringLists'><span className='centeringLists iconList'><MdKeyboardArrowRight /></span>How to deactivate / delete account?</li>
                        <li className='centeringLists'><span className='centeringLists iconList'><MdKeyboardArrowRight /></span>How to add bank account?</li>
                    </ul>
                </div>
                <div className="msg">
                    <div className='msgHead'><span className='iconMsg'><CiMail /></span>Reach us</div>
                    <div className='textArea'>
                        <textarea placeholder='Leave us message...'></textarea>
                    </div>
                    <div className='msgSendBtn'>
                        <input type="submit" value="send" />
                    </div>
                </div>
                {/* <NotificationBar/> */}
                </div>
                {/* <CreateAcc/> */}
        </>
    )
}
export default HelpPage;