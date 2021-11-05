export function getAppointmentsForDay(state, day) {
  if (state.days.length < 1) return [];
  
  const filteredDay = state.days.find((d) => d.name === day);
  if (!filteredDay) return [];

  const currentDayAppoinments = [];
  for (const elem of filteredDay.appointments) {
    currentDayAppoinments.push(state.appointments[elem]);
  }
  return currentDayAppoinments;
}

export function getInterviewersForDay(state, day) {
  if (state.days.length < 1) return [];
  
  const filteredDay = state.days.find((d) => d.name === day);
  if (!filteredDay) return [];

  const currentDayInterviewers = [];
  for (const elem of filteredDay.interviewers) {
    currentDayInterviewers.push(state.interviewers[elem]);
  }
  return currentDayInterviewers;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewerId = interview.interviewer;
  
  const result = {
    student: interview.student,
    interviewer: state.interviewers[interviewerId]
  }
  return result;
}