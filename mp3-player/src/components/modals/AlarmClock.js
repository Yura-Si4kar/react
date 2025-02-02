import React, { useContext, useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import MyButton from "../UI/MyButton";
import MyInput from "../UI/MyInput";
import { useAnimateCharacters } from "../../hooks/useAnimateCharacters";
import { useTimeUpdate } from "../../hooks/useTimeUpdate";
import { Context } from "../../context";
import { deleteItemsFromLocalStorage, updateItemsInLocalStorage } from "../../storages/localStorages";

export default function AlarmClock({ show, hide }) {
  const { app, player } = useContext(Context);
  const [alarmTime, setAlarmTime] = useState('');
  const charRefs = useRef([]);
  const [time, previousTime] = useTimeUpdate(1000);
  
  const createAlarmData = () => {
    let obj = {
      id: Date.now(),
      time: alarmTime,
      isOn: false
    };

    app.setAlarmsTime(obj);
  }

  useEffect(() => {
    app.alarmsTime.forEach(element => {
        if (element.isOn && element.time + ':00' === time) {
          player.play(0);
        }
      });
  }, [app, time, player])
  
  const handleToggle = (event) => {
    let id = event.target.parentNode.parentNode.dataset.id;
    let clickedElement = app.alarmsTime.find((el) => el.id === +id);
    clickedElement.isOn = event.target.checked;
    
    updateItemsInLocalStorage(id, clickedElement);
  };

  const deleteAlarm = (event) => {
    let id = event.target.parentNode.dataset.id;
    console.log(typeof id);
    deleteItemsFromLocalStorage(+id);
    player.reset();
  }

  useAnimateCharacters(time, previousTime, charRefs);

  return (
    <Modal show={show} onHide={hide}>
      <Modal.Header>
        <Modal.Title>Будильник</Modal.Title>
        <MyButton variant="outline" onClick={hide}>
          &#10060;
        </MyButton>
      </Modal.Header>
      <Modal.Body>
        <section className="clock-section">
          <div className="clock-wrapper">
            <div className="clock-block">
              {time.split("").map((char, index) => (
                <div key={`${char}-${index}`} ref={el => charRefs.current[index] = el} className="clock-character">
                  {char}
                </div>
              ))}
            </div>
            <div className="created-alarms">
              {app.alarmsTime.map((el) => 
                <div key={el.id} data-id={el.id} className="d-flex align-items-center mb-2">
                  <span className="me-2" key={el.id}>{el.time + ':00'}</span>
                  <label className="switch">
                    <MyInput type="checkbox" onChange={handleToggle}/>
                    <span className="slider round"></span>
                  </label>
                  <MyButton variant="outline" onClick={deleteAlarm}>
                    &#10060;
                  </MyButton>
                </div>
              )}
            </div>
          </div>
          <div className="d-flex">
            <MyInput type='time' value={alarmTime} onChange={(e) => setAlarmTime(e.target.value)} />
            <MyButton className='ms-1' variant='success' onClick={createAlarmData}>Створити</MyButton>
          </div>
        </section>
      </Modal.Body>
    </Modal>
  );
}
