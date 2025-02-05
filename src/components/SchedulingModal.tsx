import React, { useState } from 'react';
import { Calendar, Clock, X } from 'lucide-react';
import { format, addDays, setHours, setMinutes } from 'date-fns';

interface SchedulingModalProps {
  onSchedule: (date: Date) => void;
  onClose: () => void;
}

export const SchedulingModal: React.FC<SchedulingModalProps> = ({ onSchedule, onClose }) => {
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [selectedTime, setSelectedTime] = useState<string>(format(new Date(), 'HH:mm'));
  const [scheduleType, setScheduleType] = useState<'now' | 'later' | 'recurring'>('now');
  const [recurringDays, setRecurringDays] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let scheduledDate: Date;

    if (scheduleType === 'now') {
      scheduledDate = new Date();
    } else {
      const [hours, minutes] = selectedTime.split(':').map(Number);
      scheduledDate = setMinutes(setHours(new Date(selectedDate), hours), minutes);
    }

    onSchedule(scheduledDate);
  };

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Schedule Post</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">When to post?</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="now"
                  checked={scheduleType === 'now'}
                  onChange={(e) => setScheduleType(e.target.value as 'now')}
                  className="mr-2"
                />
                Now
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="later"
                  checked={scheduleType === 'later'}
                  onChange={(e) => setScheduleType(e.target.value as 'later')}
                  className="mr-2"
                />
                Later
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="recurring"
                  checked={scheduleType === 'recurring'}
                  onChange={(e) => setScheduleType(e.target.value as 'recurring')}
                  className="mr-2"
                />
                Recurring
              </label>
            </div>
          </div>

          {scheduleType !== 'now' && (
            <>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Calendar size={20} />
                  Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={format(new Date(), 'yyyy-MM-dd')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Clock size={20} />
                  Time
                </label>
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              {scheduleType === 'recurring' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Repeat on days
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {daysOfWeek.map((day) => (
                      <label key={day} className="flex items-center">
                        <input
                          type="checkbox"
                          value={day}
                          checked={recurringDays.includes(day)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setRecurringDays([...recurringDays, day]);
                            } else {
                              setRecurringDays(recurringDays.filter(d => d !== day));
                            }
                          }}
                          className="mr-2"
                        />
                        {day.slice(0, 3)}
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}