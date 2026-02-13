// MWECAU ICT Club Attendance System - Client-side JavaScript

// API Base URL
const API_BASE = '';

// Load session information
async function loadSessionInfo() {
    try {
        const response = await fetch(`${API_BASE}/api/session-info`);
        const result = await response.json();

        const sessionInfoDiv = document.getElementById('sessionInfo');
        
        if (result.success && result.data.has_session) {
            const session = result.data.session;
            const isActive = session.attendance_window.is_active;
            
            sessionInfoDiv.className = isActive ? 'session-info session-active' : 'session-info session-inactive';
            sessionInfoDiv.innerHTML = `
                <h3><i class="far fa-calendar"></i> ${session.day}, ${session.date}</h3>
                <p><strong><i class="fas fa-bullseye"></i> Focus Area:</strong> ${session.department}</p>
                <p><em>${session.description}</em></p>
                <p><strong><i class="far fa-clock"></i> Session Time:</strong> ${session.time}</p>
                <p><strong><i class="fas fa-chart-bar"></i> Attendance Status:</strong> ${isActive ? '<i class="fas fa-check-circle" style="color: green;"></i> Window is OPEN' : '<i class="fas fa-times-circle" style="color: red;"></i> Window is CLOSED'}</p>
                ${session.attendance_window.time_remaining ? `<p><strong><i class="far fa-hourglass"></i> Time Remaining:</strong> ${session.attendance_window.time_remaining}</p>` : ''}
                ${!isActive && session.attendance_window.reason ? `<p><small><i class="fas fa-info-circle"></i> ${session.attendance_window.reason}</small></p>` : ''}
            `;
        } else {
            sessionInfoDiv.className = 'session-info session-inactive';
            sessionInfoDiv.innerHTML = `
                <p><i class="fas fa-info-circle"></i> ${result.data.message}</p>
                ${result.data.next_session ? `<p><strong>Next Session:</strong> ${result.data.next_session.date}<br><em>${result.data.next_session.department} - ${result.data.next_session.description}</em></p>` : ''}
            `;
        }
    } catch (error) {
        console.error('Error loading session info:', error);
        const sessionInfoDiv = document.getElementById('sessionInfo');
        if (sessionInfoDiv) {
            sessionInfoDiv.innerHTML = '<p>Unable to load session information</p>';
        }
    }
}

// Show message
function showMessage(elementId, message, type = 'info') {
    const messageDiv = document.getElementById(elementId);
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.display = 'block';
}

// Hide message
function hideMessage(elementId) {
    const messageDiv = document.getElementById(elementId);
    messageDiv.style.display = 'none';
}

// Handle registration form submission
async function handleRegistration(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = document.getElementById('submitBtn');
    const messageDiv = document.getElementById('message');
    
    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.textContent = 'Registering...';
    hideMessage('message');
    
    // Get form data
    const formData = new FormData(form);
    
    // Get selected departments
    const departments = [];
    const deptCheckboxes = form.querySelectorAll('input[name="departments"]:checked');
    deptCheckboxes.forEach(cb => departments.push(cb.value));
    
    if (departments.length === 0) {
        showMessage('message', 'Please select at least one department', 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Register';
        return;
    }
    
    // Prepare data
    const data = {
        reg_number: formData.get('reg_number').trim(),
        full_name: formData.get('full_name').trim(),
        email: formData.get('email').trim(),
        phone: formData.get('phone').trim(),
        gender: formData.get('gender'),
        year_of_study: parseInt(formData.get('year_of_study')),
        course: formData.get('course'),
        departments: departments
    };
    
    try {
        const response = await fetch(`${API_BASE}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showMessage('message', result.message || 'Registration successful!', 'success');
            form.reset();
            
            // Redirect to attendance page after 2 seconds
            setTimeout(() => {
                window.location.href = '/attendance';
            }, 2000);
        } else {
            let errorMsg = result.error.message;
            if (result.error.details) {
                if (typeof result.error.details === 'object') {
                    errorMsg += ': ' + Object.values(result.error.details).join(', ');
                } else {
                    errorMsg += ': ' + result.error.details;
                }
            }
            showMessage('message', errorMsg, 'error');
        }
    } catch (error) {
        console.error('Registration error:', error);
        showMessage('message', 'An error occurred. Please try again.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Register';
    }
}

// Handle member check (Step 1)
async function handleMemberCheck(event) {
    event.preventDefault();
    
    const form = event.target;
    const checkBtn = document.getElementById('checkBtn');
    const regNumber = document.getElementById('regNumber').value.trim();
    
    // Disable button
    checkBtn.disabled = true;
    checkBtn.textContent = 'Checking...';
    hideMessage('step1Message');
    
    try {
        const response = await fetch(`${API_BASE}/api/check-member`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ reg_number: regNumber })
        });
        
        const result = await response.json();
        
        if (result.success) {
            if (result.data.exists) {
                // Member exists, show step 2
                const member = result.data.member;
                document.getElementById('memberName').textContent = member.full_name;
                document.getElementById('regNumberHidden').value = regNumber;
                
                // Hide step 1, show step 2
                document.getElementById('step1').style.display = 'none';
                document.getElementById('step2').style.display = 'block';
                
                // Focus on session code input
                document.getElementById('sessionCode').focus();
            } else {
                // Member doesn't exist
                showMessage('step1Message', 
                    'Registration number not found. Please register first or check your number.', 
                    'error');
                
                // Offer to redirect to registration
                setTimeout(() => {
                    if (confirm('Would you like to register now?')) {
                        window.location.href = '/register';
                    }
                }, 1000);
            }
        } else {
            showMessage('step1Message', result.error.message, 'error');
        }
    } catch (error) {
        console.error('Check member error:', error);
        showMessage('step1Message', 'An error occurred. Please try again.', 'error');
    } finally {
        checkBtn.disabled = false;
        checkBtn.textContent = 'Continue';
    }
}

// Get user GPS location
async function getUserLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('GPS not supported by your browser'));
            return;
        }
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
            (error) => {
                let message = 'Unable to get your location';
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        message = 'Location permission denied. Please enable location access.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        message = 'Location information unavailable';
                        break;
                    case error.TIMEOUT:
                        message = 'Location request timed out';
                        break;
                }
                reject(new Error(message));
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    });
}

// Handle attendance marking (Step 2)
async function handleAttendance(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = document.getElementById('submitBtn');
    const regNumber = document.getElementById('regNumberHidden').value;
    const sessionCode = document.getElementById('sessionCode').value.trim();
    
    // Disable button
    submitBtn.disabled = true;
    submitBtn.textContent = 'Getting location...';
    hideMessage('step2Message');
    
    let locationData = {};
    
    try {
        // Get GPS location
        try {
            showMessage('step2Message', 'Getting your location...', 'info');
            const location = await getUserLocation();
            locationData = location;
            showMessage('step2Message', 'Location captured. Marking attendance...', 'success');
        } catch (locationError) {
            console.warn('Location error:', locationError);
            showMessage('step2Message', `${locationError.message}. Attempting to mark without GPS...`, 'warning');
            // Continue without GPS (backend will handle)
        }
        
        submitBtn.textContent = 'Marking...';
        
        const response = await fetch(`${API_BASE}/api/mark-attendance`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                reg_number: regNumber,
                session_code: sessionCode,
                latitude: locationData.latitude,
                longitude: locationData.longitude
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Hide step 2
            document.getElementById('step2').style.display = 'none';
            
            // Show success message
            const successDiv = document.getElementById('successMessage');
            document.getElementById('successName').textContent = result.data.full_name;
            document.getElementById('successDate').textContent = result.data.session_date;
            document.getElementById('successDepartment').textContent = 
                `${result.data.department}${result.data.description ? ' - ' + result.data.description : ''}`;
            successDiv.style.display = 'block';
            
            // Scroll to success message
            successDiv.scrollIntoView({ behavior: 'smooth' });
        } else {
            showMessage('step2Message', `${result.error.message}: ${result.error.details || ''}`, 'error');
        }
    } catch (error) {
        console.error('Mark attendance error:', error);
        showMessage('step2Message', 'An error occurred. Please try again.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Mark Attendance';
    }
}

// Reset attendance form
function resetForm() {
    document.getElementById('step1').style.display = 'block';
    document.getElementById('step2').style.display = 'none';
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('regNumber').value = '';
    document.getElementById('sessionCode').value = '';
    hideMessage('step1Message');
    hideMessage('step2Message');
    
    // Focus on registration number input
    document.getElementById('regNumber').focus();
}
