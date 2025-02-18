import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { setTimezones } from "../store/clockSlice";
import Clock from "./Clock";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const timezones = useSelector((state: RootState) => state.clock.timezones);
  const [selectedTimezones, setSelectedTimezones] = useState<string[]>([]);

  useEffect(() => {
    const fetchTimezones = async () => {
      const response = await fetch("/timezones.json");
      const data = await response.json();
      dispatch(setTimezones(data));
    };

    fetchTimezones();
  }, [dispatch]);

  if (timezones.length === 0) {
    return <div>Loading timezones...</div>;
  }

  const handleAddClock = () => {
    const availableTimezones = timezones.filter(
      (tz) => !selectedTimezones.includes(tz.city)
    );
    if (availableTimezones.length > 0) {
      setSelectedTimezones([...selectedTimezones, availableTimezones[0].city]);
    }
  };

  const handleTimezoneChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const newSelectedTimezones = [...selectedTimezones];
    newSelectedTimezones[index] = event.target.value;
    setSelectedTimezones(newSelectedTimezones);
  };

  const handleRemoveClock = (index: number) => {
    setSelectedTimezones(selectedTimezones.filter((_, i) => i !== index));
  };

  return (
    <main>
      <h1 className="title-main">Временные зоны</h1>
      <button onClick={handleAddClock}>Добавить</button>
      <div className="clocks-div">
        {selectedTimezones.map((city, index) => {
          const availableTimezones = timezones.filter(
            (tz) => !selectedTimezones.includes(tz.city) || tz.city === city
          );
          const timezoneData = timezones.find((tz) => tz.city === city);
          return (
            timezoneData && (
              <div key={city}>
                <select
                  onChange={(e) => handleTimezoneChange(e, index)}
                  value={city}
                >
                  {availableTimezones.map((item) => (
                    <option key={item.city} value={item.city}>
                      {item.city}
                    </option>
                  ))}
                </select>
                <Clock timezoneOffset={Number(timezoneData.timezone)} />
                <button onClick={() => handleRemoveClock(index)}>Remove</button>
              </div>
            )
          );
        })}
      </div>
    </main>
  );
};

export default App;