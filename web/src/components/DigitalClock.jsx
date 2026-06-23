import { useState, useEffect } from 'react'
import './DigitalClock.css'

function DigitalClock() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedZones, setSelectedZones] = useState(['UTC', 'Asia/Ho_Chi_Minh', 'America/New_York', 'Europe/London'])

  const timeZones = [
    // Asia
    { name: 'Asia/Tokyo', label: '🇯🇵 Tokyo' },
    { name: 'Asia/Shanghai', label: '🇨🇳 Shanghai' },
    { name: 'Asia/Hong_Kong', label: '🇭🇰 Hong Kong' },
    { name: 'Asia/Bangkok', label: '🇹🇭 Bangkok' },
    { name: 'Asia/Ho_Chi_Minh', label: '🇻🇳 Ho Chi Minh' },
    { name: 'Asia/Singapore', label: '🇸🇬 Singapore' },
    { name: 'Asia/Kolkata', label: '🇮🇳 India' },
    { name: 'Asia/Dubai', label: '🇦🇪 Dubai' },
    { name: 'Asia/Jakarta', label: '🇮🇩 Jakarta' },
    { name: 'Asia/Manila', label: '🇵🇭 Manila' },
    
    // Europe
    { name: 'Europe/London', label: '🇬🇧 London' },
    { name: 'Europe/Paris', label: '🇫🇷 Paris' },
    { name: 'Europe/Berlin', label: '🇩🇪 Berlin' },
    { name: 'Europe/Moscow', label: '🇷🇺 Moscow' },
    { name: 'Europe/Istanbul', label: '🇹🇷 Istanbul' },
    
    // Americas
    { name: 'America/New_York', label: '🇺🇸 New York' },
    { name: 'America/Chicago', label: '🇺🇸 Chicago' },
    { name: 'America/Denver', label: '🇺🇸 Denver' },
    { name: 'America/Los_Angeles', label: '🇺🇸 Los Angeles' },
    { name: 'America/Mexico_City', label: '🇲🇽 Mexico City' },
    { name: 'America/Toronto', label: '🇨🇦 Toronto' },
    { name: 'America/Sao_Paulo', label: '🇧🇷 São Paulo' },
    
    // Other
    { name: 'UTC', label: '🌍 UTC' },
    { name: 'Australia/Sydney', label: '🇦🇺 Sydney' },
    { name: 'Pacific/Auckland', label: '🇳🇿 Auckland' },
    { name: 'Africa/Cairo', label: '🇪🇬 Cairo' },
    { name: 'Africa/Johannesburg', label: '🇿🇦 Johannesburg' },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getTimeInZone = (timeZone) => {
    try {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
      return formatter.format(currentTime)
    } catch (error) {
      return '--:--:--'
    }
  }

  const getDateInZone = (timeZone) => {
    try {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone,
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      })
      return formatter.format(currentTime)
    } catch (error) {
      return '--'
    }
  }

  const toggleTimeZone = (zone) => {
    setSelectedZones(prev => 
      prev.includes(zone)
        ? prev.filter(z => z !== zone)
        : [...prev, zone]
    )
  }

  const getZoneLabel = (zone) => {
    const tz = timeZones.find(t => t.name === zone)
    return tz ? tz.label : zone
  }

  return (
    <div className="digital-clock-container">
      <header className="clock-header">
        <h1>⏰ Digital Clock</h1>
        <p>Multiple Time Zones</p>
      </header>

      <div className="clock-content">
        {/* Time Display Section */}
        <div className="time-display-section">
          <div className="time-grid">
            {selectedZones.map(zone => (
              <div key={zone} className="time-card">
                <div className="time-label">{getZoneLabel(zone)}</div>
                <div className="digital-time">{getTimeInZone(zone)}</div>
                <div className="time-date">{getDateInZone(zone)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Time Zone Selector */}
        <div className="timezone-selector-section">
          <h2>📍 Select Time Zones</h2>
          <div className="timezone-categories">
            {/* Asia */}
            <div className="timezone-category">
              <h3>🌏 Asia</h3>
              <div className="timezone-buttons">
                {timeZones.filter(t => t.name.startsWith('Asia')).map(tz => (
                  <button
                    key={tz.name}
                    className={`timezone-btn ${selectedZones.includes(tz.name) ? 'active' : ''}`}
                    onClick={() => toggleTimeZone(tz.name)}
                  >
                    {tz.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Europe */}
            <div className="timezone-category">
              <h3>🌍 Europe</h3>
              <div className="timezone-buttons">
                {timeZones.filter(t => t.name.startsWith('Europe')).map(tz => (
                  <button
                    key={tz.name}
                    className={`timezone-btn ${selectedZones.includes(tz.name) ? 'active' : ''}`}
                    onClick={() => toggleTimeZone(tz.name)}
                  >
                    {tz.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Americas */}
            <div className="timezone-category">
              <h3>🌎 Americas</h3>
              <div className="timezone-buttons">
                {timeZones.filter(t => t.name.startsWith('America')).map(tz => (
                  <button
                    key={tz.name}
                    className={`timezone-btn ${selectedZones.includes(tz.name) ? 'active' : ''}`}
                    onClick={() => toggleTimeZone(tz.name)}
                  >
                    {tz.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Other */}
            <div className="timezone-category">
              <h3>🌐 Other</h3>
              <div className="timezone-buttons">
                {timeZones.filter(t => !t.name.startsWith('Asia') && !t.name.startsWith('Europe') && !t.name.startsWith('America')).map(tz => (
                  <button
                    key={tz.name}
                    className={`timezone-btn ${selectedZones.includes(tz.name) ? 'active' : ''}`}
                    onClick={() => toggleTimeZone(tz.name)}
                  >
                    {tz.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DigitalClock
