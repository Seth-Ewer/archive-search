import React from 'react';
import { ResultType } from '../App';
import { EmptyStringHandler } from '../utilities';

interface DetailsPaneProps {
  result: ResultType;
  setDetailsOpen(input: number): void;
}

const DetailsPane: React.FC<DetailsPaneProps> = (props) => {

  //Handle display of Format and Subject data
  const MiniPanel = (data: string[], name: string) => {
    if (data !== null) {
      return (
        <div className='col'>
          <h5>{name}:</h5>
          <div className='row'>
            {data.map((item, index) => (
              <div className="Details-Tag card col-3 p-1 m-1" key={index}>{item}</div>
            ))}
          </div>
        </div>
      )
    } else {
      return <div>No {name} Found</div>
    }
  }


  return (
    <div id="Details" className='container col'>

      <h2>{props.result.title}</h2>

      <div className='row'>
        <h5 className='col-3'>{EmptyStringHandler(props.result.creator, "Creator")}</h5>
        <h5 className='col-3'>{EmptyStringHandler(props.result.date, "Date")}</h5>
      </div>

      <p className='fw-semibold'>Media Type: {props.result.mediatype}</p>

      {props.result.description.map((line, index) => (
        <p key={index}>{line}</p>
      ))}

      {MiniPanel(props.result.subject, "Subjects")}
      {MiniPanel(props.result.format, "Formats")}

      <button className='btn btn-dark btn-lg my-3' onClick={() => props.setDetailsOpen(-1)}>Close</button>

    </div>
  );
}

export default DetailsPane;