import React, { Fragment } from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {

  //calling the useVisualMode custome hook
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //in charge of saving appointments
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    //references bookInterview in useApplicationData
    props.bookInterview(props.id, interview)
    .then(()=> transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
  }

  //in charge of deleteing apointments
  function deleteAppointment() {
    transition(DELETING, true)
    //references cancelInterview in useApplicationData
    props.cancelInterview(props.id)
    .then(()=> transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true));
  }

  return (
    <Fragment>
      <Header time={props.time} />
      <article className="appointment">
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
          />
        )}
        {mode === CREATE && <Form interviewers={props.interviewers} 
        onSave={save} 
        onCancel={() => back(EMPTY)} />}
        {mode === SAVING && <Status message="Saving" />}
        {mode === DELETING && <Status message="Deleting" />}
        {mode === ERROR_SAVE && <Error message="Could not save appointment" 
        onClose={back} />}
        {mode === ERROR_DELETE && <Error message="Could not delete appointment" 
        onClose={back} />}
        {mode === CONFIRM && <Confirm message="Delete the appointment?" 
        onCancel={() => transition(SHOW)} 
        onConfirm={deleteAppointment} />}
        {mode === EDIT && <Form student={props.interview.student} 
        interviewer={props.interview.interviewer.id} 
        interviewers={props.interviewers} 
        onSave={save} 
        onCancel={back} />}
      </article>
    </Fragment>
  );
}