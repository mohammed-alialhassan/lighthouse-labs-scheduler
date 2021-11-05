import { useState, useEffect } from "react";
import axios from "axios";

//taken from Application.js, made to organize file and make it more readible
export default function useApplicationData() {
  
  //defining state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });
  //const setDays = (days) => setState(prev => ({ ...prev, days }));

//function made for defining a new appointment
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      const days = spotsLeftForDay(state, appointments);
      setState((prev) => ({ ...prev, days, appointments }));
    });
  }

  //function made to help cancel appointments
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(`/api/appointments/${id}`).then(() => {
      const days = spotsLeftForDay(state, appointments);
      setState((prev) => ({ ...prev, days, appointments }));
    });
  }

  //function used to define number of available slots left
  function spotsLeftForDay(state, appointments) {
    let count = 0;
    const filteredDay = state.days.find((d) => d.name === state.day);

    for (const elem of filteredDay.appointments) {
      if (appointments[elem].interview === null) count++;
    }
    const updatedDay = {
      ...filteredDay,
      spots: count,
    };
    const days = state.days.map((day) =>
      day.id === filteredDay.id ? updatedDay : day
    );
    return days;
  }

  //useEffect containing axious routes for the 3 main endpoints
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}