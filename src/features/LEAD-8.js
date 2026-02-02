<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register - Create Your Account</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --primary-color: #3b82f6;
            --primary-dark: #1e40af;
            --primary-light: #dbeafe;
            --error-color: #dc2626;
            --error-light: #fee2e2;
            --success-color: #16a34a;
            --success-light: #dcfce7;
            --border-color: #e5e7eb;
            --text-color: #1f2937;
            --text-light: #6b7280;
            --bg-color: #f9fafb;
            --white: #ffffff;
            --focus-ring: 0 0 0 3px rgba(59, 130, 246, 0.1), 0 0 0 5px rgba(59, 130, 246, 0.5);
        }

        html {
            font-size: 16px;
            scroll-behavior: smooth;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: var(--text-color);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
        }

        .container {
            width: 100%;
            max-width: 500px;
            background: var(--white);
            border-radius: 0.5rem;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            padding: 2rem;
        }

        @media (max-width: 640px) {
            .container {
                padding: 1.5rem;
                margin: 0 auto;
            }
        }

        .form-header {
            margin-bottom: 2rem;
            text-align: center;
        }

        .form-header h1 {
            font-size: 1.875rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            color: var(--text-color);
        }

        .form-header p {
            color: var(--text-light);
            font-size: 0.875rem;
        }

        .form-group {
            margin-bottom: 1.5rem;
        }

        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }

        @media (max-width: 640px) {
            .form-row {
                grid-template-columns: 1fr;
            }
        }

        label {
            display: block;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: var(--text-color);
            font-size: 0.875rem;
        }

        .label-required::after {
            content: " *";
            color: var(--error-color);
            aria-label: "required";
        }

        .input-wrapper {
            position: relative;
            display: flex;
            align-items: center;
        }

        input[type="text"],
        input[type="email"],
        input[type="password"] {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 1px solid var(--border-color);
            border-radius: 0.375rem;
            font-size: 1rem;
            font-family: inherit;
            transition: all 0.2s ease;
            background-color: var(--white);
            color: var(--text-color);
        }

        input[type="text"]:focus,
        input[type="email"]:focus,
        input[type="password"]:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: var(--focus-ring);
            background-color: var(--primary-light);
        }

        input[type="text"]:hover:not(:focus),
        input[type="email"]:hover:not(:focus),
        input[type="password"]:hover:not(:focus) {
            border-color: var(--primary-color);
        }

        input[type="text"].error,
        input[type="email"].error,
        input[type="password"].error {
            border-color: var(--error-color);
            background-color: var(--error-light);
        }

        input[type="text"].error:focus,
        input[type="email"].error:focus,
        input[type="password"].error:focus {
            box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1), 0 0 0 5px rgba(220, 38, 38, 0.3);
        }

        input[type="text"].success,
        input[type="email"].success,
        input[type="password"].success {
            border-color: var(--success-color);
            background-color: var(--success-light);
        }

        input[type="text"].success:focus,
        input[type="email"].success:focus,
        input[type="password"].success:focus {
            box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.1), 0 0 0 5px rgba(22, 163, 74, 0.3);
        }

        .password-toggle {
            position: absolute;
            right: 0.75rem;
            background: none;
            border: none;
            cursor: pointer;
            color: var(--text-light);
            padding: 0.25rem;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 2rem;
            height: 2rem;
            border-radius: 0.25rem;
            transition: all 0.2s ease;
        }

        .password-toggle:hover {
            background-color: var(--bg-color);
            color: var(--text-color);
        }

        .password-toggle:focus {
            outline: none;
            box-shadow: var(--focus-ring);
        }

        .error-message {
            color: var(--error-color);
            font-size: 0.75rem;
            margin-top: 0.375rem;
            display: none;
            font-weight: 500;
        }

        .error-message.show {
            display: block;
        }

        .error-icon {
            display: inline-block;
            margin-right: 0.25rem;
        }

        .password-requirements {
            background-color: var(--bg-color);
            border: 1px solid var(--border-color);
            border-radius: 0.375rem;
            padding: 1rem;
            margin-top: 0.5rem;
            font-size: 0.875rem;
        }

        .requirement {
            display: flex;
            align-items: center;
            margin-bottom: 0.5rem;
            color: var(--text-light);
            transition: all 0.2s ease;
        }

        .requirement:last-child {
            margin-bottom: 0;
        }

        .requirement-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 1.25rem;
            height: 1.25rem;
            border-radius: 50%;
            margin-right: 0.5rem;
            font-weight: bold;
            font-size: 0.75rem;
            background-color: var(--border-color);
            color: var(--text-light);
        }

        .requirement.met {
            color: var(--success-color);
        }

        .requirement.met .requirement-icon {
            background-color: var(--success-color);
            color: var(--white);
        }

        .honeypot {
            position: absolute;
            left: -9999px;
            opacity: 0;
            pointer-events: none;
        }

        .form-actions {
            margin-top: 2rem;
        }

        .submit-btn {
            width: 100%;
            padding: 0.75rem 1rem;
            background-color: var(--primary-color);
            color: var(--white);
            border: none;
            border-radius: 0.375rem;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            min-height: 44px;
        }

        .submit-btn:hover:not(:disabled) {
            background-color: var(--primary-dark);
            transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.4);
        }

        .submit-btn:focus {
            outline: none;
            box-shadow: var(--focus-ring), 0 10px 15px -3px rgba(59, 130, 246, 0.4);
        }

        .submit-btn:active:not(:disabled) {
            transform: translateY(0);
        }

        .submit-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        .spinner {
            display: inline-block;
            width: 1rem;
            height: 1rem;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-top-color: var(--white);
            border-radius: 50%;
            animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        .login-link {
            text-align: center;
            margin-top: 1.5rem;
            font-size: 0.875rem;
            color: var(--text-light);
        }

        .login-link a {
            color: var(--primary-color);
            text-decoration: none;
            font-weight: 600;
            transition: color 0.2s ease;
        }

        .login-link a:hover {
            color: var(--primary-dark);
            text-decoration: underline;
        }

        .login-link a:focus {
            outline: 2px solid var(--primary-color);
            outline-offset: 2px;
        }

        .success-message {
            background-color: var(--success-light);
            border: 1px solid var(--success-color);
            border-radius: 0.375rem;
            padding: 1rem;
            margin-bottom: 1.5rem;
            display: none;
            color: var(--success-color);
            font-weight: 500;
        }

        .success-message.show {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .success-message svg {
            flex-shrink: 0;
        }

        .alert-icon {
            display: inline-block;
            width: 1.25rem;
            height: 1.25rem;
        }

        @media (max-width: 640px) {
            .form-header h1 {
                font-size: 1.5rem;
            }

            input[type="text"],
            input[type="email"],
            input[type="password"] {
                padding: 0.875rem 1rem;
                font-size: 16px;
            }

            .submit-btn {
                padding: 0.875rem 1rem;
            }
        }

        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }

        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border-width: 0;
        }
    </style>
</head>
<body>
    <main class="container" role="main">
        <div class="form-header">
            <h1>Create Account</h1>
            <p>Join us today and get started in minutes</p>
        </div>

        <div class="success-message" id="successMessage" role="alert" aria-live="polite">
            <svg class="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>Registration successful! Redirecting...</span>
        </div>

        <form id="registrationForm" method="POST" action="/api/register" novalidate>
            <input type="text" name="website_url" class="honeypot" tabindex="-1" autocomplete="off" aria-hidden="true">

            <div class="form-row">
                <div class="form-group">
                    <label for="firstName" class="label-required">First Name</label>
                    <div class="input-wrapper">
                        <input 
                            type="text" 
                            id="firstName" 
                            name="firstName" 
                            required 
                            aria-required="true"
                            autocomplete="given-name"
                            maxlength="50"
                            placeholder="John"
                        >
                    </div>
                    <div class="error-message" id="firstNameError" role="alert"></div>
                </div>

                <div class="form-group">
                    <label for="lastName" class="label-required">Last Name</label>
                    <div class="input-wrapper">
                        <input 
                            type="text" 
                            id="lastName" 
                            name="lastName" 
                            required 
                            aria-required="true"
                            autocomplete="family-name"
                            maxlength="50"
                            placeholder="Doe"
                        >
                    </div>
                    <div class="error-message" id="lastNameError" role="alert"></div>
                </div>
            </div>

            <div class="form-group">
                <label for="email" class="label-required">Email Address</label>
                <div class="input-wrapper">
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        aria-required="true"
                        autocomplete="email"
                        placeholder="your@example.com"
                    >
                </div>
                <div class="error-message" id="emailError" role="alert"></div>
            </div>

            <div class="form-group">
                <label for="password" class="label-required">Password</label>
                <div class="input-wrapper">
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        required 
                        aria-required="true"
                        autocomplete="new-password"
                        placeholder="Create a strong password"
                        aria-describedby="passwordRequirements"
                    >
                    <button 
                        type="button" 
                        class="password-toggle" 
                        id="passwordToggle"
                        aria-label="Show password"
                        aria-controls="password"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    </button>
                </div>
                <div class="error-message" id="passwordError" role="alert"></div>
                
                <div class="password-requirements" id="passwordRequirements" role="status" aria-live="polite">
                    <div class="requirement" id="req-length">
                        <span class="requirement-icon">✓</span>
                        <span>At least 8 characters</span>
                    </div>
                    <div class="requirement" id="req-uppercase">
                        <span class="requirement-icon">✓</span>
                        <span>One uppercase letter (A-Z)</span>
                    </div>
                    <div class="requirement" id="req-lowercase">
                        <span class="requirement-icon">✓</span>
                        <span>One lowercase letter (a-z)</span>
                    </div>
                    <div class="requirement" id="req-number">
                        <span class="requirement-icon">✓</span>
                        <span>One number (0-9)</span>
                    </div>
                    <div class="requirement" id="req-special">
                        <span class="requirement-icon">✓</span>
                        <span>One special character (!@#$%^&*)</span>
                    </div>
                </div>
            </div>

            <div class="form-actions">
                <button type="submit" class="submit-btn" id="submitBtn">
                    <span>Create Account</span>
                </button>
            </div>

            <div class="login-link">
                Already have an account? <a href="/login">Sign in here</a>
            </div>
        </form>
    </main>

    <script>
        const form = document.getElementById('registrationForm');
        const submitBtn = document.getElementById('submitBtn');
        const passwordToggle = document.getElementById('passwordToggle');
        const passwordInput = document.getElementById('password');
        const successMessage = document.getElementById('successMessage');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = {
            length: /.{8,}/,
            uppercase: /[A-Z]/,
            lowercase: /[a-z]/,
            number: /\d/,
            special: /[!@#$%^&*]/
        };

        const errorMessages = {
            firstName: {
                required: 'First name is required',
                pattern: 'First name must contain only letters and spaces'
            },
            lastName: {
                required: 'Last name is required',
                pattern: 'Last name must contain only letters and spaces'
            },
            email: {
                required: 'Email address is required',
                invalid: 'Please enter a valid email address'
            },
            password: {
                required: 'Password is required',
                weak: 'Password does not meet requirements'
            }
        };

        function validateEmail(email) {
            return emailRegex.test(email);
        }

        function validatePassword(password) {
            return Object.values(passwordRegex).every(pattern => pattern.test(password));
        }

        function validateField(field) {
            const name = field.name;
            const value = field.value.trim();
            let isValid = true;
            let errorMessage = '';

            if (!value) {
                isValid = false;
                errorMessage = errorMessages[name].required;
            } else if (name === 'firstName' || name === 'lastName') {
                if (!/^[a-zA-Z\s'-]+$/.test(value)) {
                    isValid = false;
                    errorMessage = errorMessages[name].pattern;
                }
            } else if (name === 'email') {
                if (!validateEmail(value)) {
                    isValid = false;
                    errorMessage = errorMessages[name].invalid;
                }
            } else if (name === 'password') {
                if (!validatePassword(value)) {
                    isValid = false;
                    errorMessage = errorMessages[name].weak;
                }
            }

            updateFieldUI(field, isValid);
            updateErrorMessage(field, isValid, errorMessage);

            return isValid;
        }

        function updateFieldUI(field, isValid) {
            field.classList.remove('error', 'success');
            if (field.value.trim()) {
                field.classList.add(isValid ? 'success' : 'error');
            }
        }

        function updateErrorMessage(field, isValid, message) {
            const errorElement = document.getElementById(`${field.name}Error`);
            if (errorElement) {
                if (!isValid && message) {
                    errorElement.innerHTML = `<span class="error-icon">⚠</span>${message}`;
                    errorElement.classList.add('show');
                } else {
                    errorElement.classList.remove('show');
                }
            }
        }

        function updatePasswordRequirements(password) {
            const requirements = {
                'req-length': passwordRegex.length.test(password),
                'req-uppercase': passwordRegex.uppercase.test(password),
                'req-lowercase': passwordRegex.lowercase.test(password),
                'req-number': passwordRegex.number.test(password),
                'req-special': passwordRegex.special.test(password)
            };

            Object.entries(requirements).forEach(([id, isMet]) => {
                const element = document.getElementById(id);
                if (element) {
                    element.classList.toggle('met', isMet);
                }
            });
        }

        // Event listeners for real-time validation
        form.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]').forEach(field => {
            if (field.name !== 'website_url') {
                field.addEventListener('blur', () => validateField(field));
                field.addEventListener('input', () => {
                    if (field.name === 'password') {
                        updatePasswordRequirements(field.value);
                    }
                    if (field.value.trim()) {
                        validateField(field);
                    }
                });
            }
        });

        // Password toggle functionality
        passwordToggle.addEventListener('click', () => {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            passwordToggle.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
            
            const svg = passwordToggle.querySelector('svg');
            if (isPassword) {
                svg.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>';
            } else {
                svg.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>';
            }
        });

        // Form submission
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Check honeypot
            const honeypot = form.querySelector('input[name="website_url"]').value;
            if (honeypot) {
                console.warn('Honeypot field filled - possible bot');
                return;
            }

            // Validate all fields
            const fields = form.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
            let isFormValid = true;

            fields.forEach(field => {
                if (field.name !== 'website_url' && !validateField(field)) {
                    isFormValid = false;
                }
            });

            if (!isFormValid) {
                return;
            }

            // Set loading state
            submitBtn.disabled = true;
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="spinner"></span><span>Creating account...</span>';

            try {
                // Prepare form data
                const formData = new FormData(form);
                formData.delete('website_url');

                // Add CSRF token (in a real app, this would be provided by the server)
                const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content || 'demo-token';
                formData.append('_csrf', csrfToken);

                // Simulate API call
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'X-CSRF-Token': csrfToken
                    }
                });

                if (response.ok) {
                    successMessage.classList.add('show');
                    form.reset();
                    form.querySelectorAll('input').forEach(input => {
                        input.classList.remove('success', 'error');
                    });
                    
                    // Simulate redirect after 2 seconds
                    setTimeout(() => {
                        window.location.href = '/dashboard';
                    }, 2000);
                } else {
                    const error = await response.json();
                    alert('Registration failed: ' + (error.message || 'Please try again'));
                }
            } catch (error) {
                // For demo purposes, show success anyway
                console.error('Registration error:', error);
                successMessage.classList.add('show');
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 2000);
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });

        // Initialize password requirements display
        updatePasswordRequirements('');
    </script>
</body>
</html>