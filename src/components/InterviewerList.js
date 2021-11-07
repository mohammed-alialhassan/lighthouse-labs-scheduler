import React from "react";
import "components/InterviewerList.scss";
import InterviewListItem from "components/InterviewerListItem";
import PropTypes from 'prop-types';

export default function InterviewerList(props) {
  const interviewers = props.interviewers.map(interviewer => {
    return (
      <InterviewListItem
        key={interviewer.id}
        setInterviewer={() => props.onChange(interviewer.id)}
        selected={interviewer.id === props.value}
        {...interviewer}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

