import React, { useState } from 'react';
import { SearchType } from '../App';

interface SearchBarProps {
  attemptSearch(input: SearchType): void;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {

  //Variables to store each field of the search bar
  const [anyField, setAnyField] = useState("");
  const [titleField, setTitleField] = useState("");
  const [subjectField, setSubjectField] = useState("");
  const [creatorField, setCreatorField] = useState("");
  const [dateField, setDateField] = useState("");
  const [descriptionField, setDescriptionField] = useState("");

  return (
    <div className="container-fluid align-text">

      <h4 className='mx-1 my-3'>Search</h4>

      <div className="input-group my-2">
        <span className='input-group-text'>All</span>
        <input className='form-control' type="text" onChange={e => setAnyField(e.target.value)} value={anyField}></input>
      </div>

      <div className="input-group my-2">
        <span className='input-group-text'>Title</span>
        <input className='form-control' type="text" onChange={e => setTitleField(e.target.value)} value={titleField}></input>
      </div>

      <div className="input-group my-2">
        <span className='input-group-text'>Subject</span>
        <input className='form-control' type="text" onChange={e => setSubjectField(e.target.value)} value={subjectField}></input>
      </div>

      <div className="input-group my-2">
        <span className='input-group-text'>Creator</span>
        <input className='form-control' type="text" onChange={e => setCreatorField(e.target.value)} value={creatorField}></input>
      </div>

      <div className="input-group my-2">
        <span className='input-group-text'>Date</span>
        <input className='form-control' type="date" onChange={e => setDateField(e.target.value)} value={dateField}></input>
      </div>

      <div className="input-group my-2">
        <span className='input-group-text'>Description</span>
        <input className='form-control' type="text" onChange={e => setDescriptionField(e.target.value)} value={descriptionField}></input>
      </div>

      <button className='btn btn-dark btn-lg' onClick={
        () => props.attemptSearch({ any: anyField, title: titleField, subject: subjectField, creator: creatorField, date: dateField, description: descriptionField })
      }>Search</button>

    </div>
  );
}

export default SearchBar;