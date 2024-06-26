import React, { useState, useEffect, useRef} from 'react';
import 'rsuite/dist/rsuite.min.css';
import { DateRangePicker } from 'rsuite';

import 'react-datepicker/dist/react-datepicker.css';
import { eachDayOfInterval, format, parseISO } from 'date-fns';
import TimeRangePicker from './TimeRange';
import { setHours, setMinutes, addDays, isBefore, addHours } from 'date-fns';

const AvailabilityPicker = ({ setSelectedDates: updateParentSelectedDates, isRangeFixed = false, fixedDateRange}) => {
  const [selectedDates, setSelectedDates] = useState({});
  const [dateRange, setDateRange] = useState(null);
  
  const handleRangeChange = (range) => {
      // Ensure range is defined and has two date
    if (!range || !range.length || range[0] === null) {
        setDateRange(null);
        setSelectedDates({});
        updateParentSelectedDates({});
        return;
    }
    setDateRange(range);
    const daysArray = eachDayOfInterval({ start: addHours(range[0],24), end: addHours(range[1], 24) });
    const newSelectedDates = daysArray.reduce((acc, day) => {
      const formattedDate = format(day, 'yyyy-MM-dd');
      acc[formattedDate] = selectedDates[formattedDate] || {
        active: false,
      };
      return acc;
    }, {});
    setSelectedDates(newSelectedDates);
    updateParentSelectedDates(newSelectedDates); // Propagate initial date range to parent
  };

  const shouldDisableDate = (date) => {
    if (isRangeFixed && fixedDateRange) {
      const { start, end } = fixedDateRange;
      
      // Ensure both start and end are defined before proceeding
      if (!start || !end) {
        return false; // Or handle as appropriate for your logic
      }
  
      const startDate = parseISO(start);
      const endDate = addDays(parseISO(end), 1); // Make end inclusive
  
      // Disable dates before start or after end
      return isBefore(date, startDate) || isBefore(endDate, date);
    }
  
    // Default behavior: disable dates before today
    return isBefore(date, new Date());
  };

  const toggleDate = (date) => {
    const isActive = selectedDates[date]?.active;

    // Check if we're activating the date and if it doesn't already have timeRanges
    if (!isActive && (!selectedDates[date]?.timeRanges || selectedDates[date]?.timeRanges.length === 0)) {
        // Define initial or default time ranges for a new activation
        const initialStartTime = setHours(setMinutes(new Date(), 0), 9);
        const initialEndTime = setHours(setMinutes(new Date(), 0), 17);
        const defaultTimeRanges = [{ startTime: initialStartTime, endTime: initialEndTime }];
        
        // Include these default time ranges in the update
        const updatedSelectedDates = {
            ...selectedDates,
            [date]: {
                ...selectedDates[date],
                active: true, // Explicitly set to true for clarity
                timeRanges: defaultTimeRanges, // Assign default time ranges
            },
        };

        setSelectedDates(updatedSelectedDates);
        updateParentSelectedDates(updatedSelectedDates); // Propagate with default time ranges
    } else {
        // For deactivation or if already has timeRanges, just toggle the active state
        const updatedSelectedDates = {
            ...selectedDates,
            [date]: {
                ...selectedDates[date],
                active: !isActive,
            },
        };

        setSelectedDates(updatedSelectedDates);
        updateParentSelectedDates(updatedSelectedDates); // Propagate with existing time ranges
    }
};

const handleTimeChange = (date, updatedRanges) => {
  console.log("Updated Ranges:", updatedRanges);
  // Update the local state first
  setSelectedDates(prevDates => ({
      ...prevDates,
      [date]: {
          ...prevDates[date],
          timeRanges: updatedRanges,
      },
  }));
};

// Use useEffect to propagate changes to the parent component
useEffect(() => {
  updateParentSelectedDates(selectedDates);
}, [selectedDates, updateParentSelectedDates]);


  return (
    <>
      <div className=" w-full flex-col p-4 justify-center items-center">
      <DateRangePicker showOneCalendar onChange={handleRangeChange} placeholder="Select Date Range" shouldDisableDate={shouldDisableDate}/>
        
        {dateRange && Object.keys(selectedDates).map((date, index) => (
          <div key={index} className="flex items-center my-8 min-h-8">
              <label className="inline-flex items-center cursor-pointer">
                  <input
                      type="checkbox"
                      className="sr-only peer"
                      onChange={() => toggleDate(date)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:bg-blue-600 relative transition-colors after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5 pr-4"></div>
              </label>
              <label className='px-4 text-m'>{format(new Date(date), 'PP')}</label>
              {selectedDates[date]?.active && (
                <TimeRangePicker 
                  key={date} 
                  onTimeChange={(timeRanges) => handleTimeChange(date, timeRanges)}
                />
              )}
          </div>
        ))}
      </div>
    </>
  );
};

export default AvailabilityPicker;
