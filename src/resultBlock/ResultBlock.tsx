import React from 'react';
import { ResultType } from '../App';
import { EmptyStringHandler } from '../utilities';

interface ResultBlockProps {
  id: number;
  result: ResultType;
  setDetailsOpen(input: number): void;
}

const ResultBlock: React.FC<ResultBlockProps> = (props) => {
  return (
    <div id="ResultBlock" className='col-3 card m-1'>
      <div className='card-body'>
        <h5 className='card-title'>{props.result.title}</h5>
        <p className='card-text'>{EmptyStringHandler(props.result.date, "Date")}</p>
        <p className='card-text'>{EmptyStringHandler(props.result.creator, "Creator")}</p>
      </div>
      <button className='btn btn-secondary btn-sm mb-2' onClick={() => props.setDetailsOpen(props.id)}>Details</button>
    </div>
  );
}

export default ResultBlock;