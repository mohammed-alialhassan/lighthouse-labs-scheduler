import React, {useState, useEffect} from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from 'components/Appointment'
import "components/Appointment";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https:i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Mo Pete",
      interviewer: {
        id: 2,
        name: "Tori Malcolm", 
        avatar: "https:i.imgur.com/Nmx0Qxo.png",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "No Dice",
      interviewer: {
        id: 3,
        name: "Mildred Nazir", 
        avatar: "https:i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Oh Ee",
      interviewer: {
        id: 4,
        name: "Cohana Roy", 
        avatar: "https:i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: 6,
    time: "5pm",
  },
];

export default function Application(props) {

  //const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([])
  const setDay = day => setState(state => ({ ...state, day }));

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  useEffect(() => {
       axios.get("http://localhost:8001/api/days")
       .then(resp => {
          console.log(resp)
          setDays(() => resp.data)
          setState(prev => ({ ...prev, days }));
          setState(state => ({...state, days: resp.data}))
         setDays(resp.data)
       })
       .catch(err => {
         console.error(err)
       })
     }, []);

  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
<DayList
  days={state.days}
  day={state.day}
  setDay={setDay}
/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
      {appointments.map((appointment) => (<Appointment key={appointment.id} {...appointment} />))}
      <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
