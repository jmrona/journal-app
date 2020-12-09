import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const { active:note } = useSelector( state => state.notes)

    const [formValues, handleInputChange, reset ] = useForm( note );
    const { body, title, id } = formValues;

    const activeId = useRef( note.id );
    useEffect( () => {
        if( note.id !== activeId.current ){
            reset(note)
            activeId.current = note.id
        }
    },[note, reset])

    const dispatch = useDispatch();
    useEffect( () => {
        dispatch( activeNote(formValues.id, {...formValues}) )
    }, [formValues, dispatch])

    const handleDelete = () => {
        dispatch( startDeleting( id ));
    }

    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                <input
                    name="title"
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    value={ title }
                    onChange={ handleInputChange }
                    autoComplete="off"
                />
                <textarea 
                    name="body"
                    placeholder="What happened today?" 
                    className="notes__textarea"
                    value={ body }
                    onChange={ handleInputChange }
                ></textarea>

                {
                    note.url &&
                    <div className="notes__image">
                        <img 
                            src={ note.url }
                            alt="tree"
                        />
                    </div>
                }
            </div>

            <button 
                className="btn btn-danger"
                onClick={handleDelete}
            >
                <i 
                    className="fas fa-trash"
                    style={{ paddingRight: '10px'}}
                ></i>
                Delete
            </button>
        </div>
    )
}
