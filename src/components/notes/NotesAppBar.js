import React from 'react'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const { active:note } = useSelector( state => state.notes)
    const date = moment(note.date)
    const handleSave = () => {
        dispatch(startSaveNote(note));
    }

    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if ( file ){
            dispatch( startUploading(file))
        }
    }

    
    return (
        <div className="notes__appbar">
            <span>{ date.format('MMMM Do YYYY')}</span>
            <input 
                id="fileSelector"
                type="file" 
                name="file"
                style={{ display: 'none'}}
                onChange={ handleFileChange }    
            />
            <div>
                <button onClick={ handlePictureClick }
                    className="btn"
                >
                    <i className="fas fa-camera fa-2x"></i>
                </button>
                <button className="btn" onClick={ handleSave }>
                    <i className="fas fa-save fa-2x"></i>
                </button>
            </div>
        </div>
    )
}
