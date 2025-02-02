import React, { useContext, useState } from 'react'
import MyInput from '../UI/MyInput'
import MyButton from '../UI/MyButton';
import { Context } from '../../context';
import { getAuthUserId, updateUserData } from '../../firebase/userApi';
import { uploadPhoto } from '../../firebase/filesApi';
import { startSession } from '../../firebase/session';

export default function UserSettings() {
  const { app } = useContext(Context);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [file, setFile] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  }
  
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  const saveUserInfo = async () => {
    try {
      app.setLoading(true);
      const photoURL = await uploadPhoto(file);
      await updateUserData(name, photoURL, phone);
      const newUserData = await getAuthUserId();
      startSession(newUserData);
      setName('');
      setFile(null);
    } catch (e) {
      alert("Помилка оновлення інформації:", e);
    } finally {
      app.setLoading(false);
    }
  }

  return (
    <section className='d-flex flex-column'>
        <h2 className='align-self-center'>Додати інформацію про користувача:</h2>
        <div>
          <MyInput 
            className='mt-2'
            type='text'
            placeholder="Введіть ваше ім'я/Нік нейм"
            onChange={handleNameChange}
          />
          <MyInput 
            className='mt-2'
            type='text'
            placeholder='Ваш номер телефону'
            onChange={handlePhoneChange}
          />
          <div className='d-flex mt-2'>
            <label htmlFor='file'>Завантажити фото</label>
            <MyInput 
              id='file'
              type='file'
              onChange={handleFileChange}
            />
          </div>
        </div>
        <MyButton
          type='button'
          variant='success'
          className='align-self-center mt-4'
          onClick={saveUserInfo}
        >Зберегти</MyButton>
    </section>
  )
}
