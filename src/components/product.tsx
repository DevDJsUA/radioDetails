import React, {useState} from 'react';
import { ITable } from '../interfaces/itable';
import styles from './product.module.css';


export const Product = (props: ITable) => {
    const [photoClass, setPhotoClass] = useState<boolean>(false)
    const photoClickHandler = () => {
        console.log(props.photo)
        if(!photoClass)
            setPhotoClass(true)
        else 
            setPhotoClass(false)
    }
    return(
        <div>
            <div className={styles.product}>
                <p>{props.prodName}</p>
                <p>{props.price}</p>
                <p>{props.description}</p>
                <button onClick={photoClickHandler}>Photo</button>
                
            </div>
            <img src={props.photo} className={!photoClass ? styles.photoUnActive : styles.photoActive}/>
        </div>
    )
}