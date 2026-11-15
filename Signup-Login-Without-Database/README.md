
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="AuthFlow - Secure Signup and Login System built using FastAPI, Python, JWT and Argon2.">
    <title>AuthFlow | Project Documentation</title>

    <style>
        :root {
            --bg: #f4f6fb;
            --surface: #ffffff;
            --text: #202b3c;
            --muted: #65748b;
            --primary: #6558d3;
            --primary-light: #eeeaff;
            --border: #e5e9f1;
            --green: #16865b;
            --code: #182235;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html {
            scroll-behavior: smooth;
        }

        body {
            background: var(--bg);
            color: var(--text);
            font-family: Inter, "Segoe UI", Arial, sans-serif;
            line-height: 1.7;
        }

        a {
            color: var(--primary);
            text-decoration: none;
        }

        .hero {
            background: linear-gradient(130deg, #28234f, #5545a9, #806fd6);
            color: white;
            padding: 75px 20px;
            text-align: center;
        }

        .hero .tag {
            display: inline-block;
            border: 1px solid #ffffff50;
            padding: 6px 15px;
            border-radius: 30px;
            font-size: 12px;
            letter-spacing: 1px;
            margin-bottom: 22px;
        }

        .hero h1 {
            font-size: clamp(38px, 7vw, 64px);
            font-weight: 800;
            letter-spacing: -2px;
            margin-bottom: 12px;
        }

        .hero p {
            max-width: 700px;
            margin: auto;
            color: #e5e0ff;
            font-size: 17px;
        }

        .hero-buttons {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 12px;
            margin-top: 30px;
        }

        .btn {
            padding: 12px 23px;
            border-radius: 9px;
            font-weight: 650;
            display: inline-block;
            transition: .2s;
        }

        .btn-primary {
            background: white;
            color: #493b9b;
        }

        .btn-secondary {
            border: 1px solid #ffffff80;
            color: white;
        }

        .btn:hover {
            transform: translateY(-3px);
        }

        .container {
            max-width: 1080px;
            margin: 35px auto;
            padding: 0 20px;
        }

        .stats {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
            margin-top: -5px;
        }

        .stat {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 13px;
            padding: 22px;
            text-align: center;
        }

        .stat strong {
            display: block;
            color: var(--primary);
            font-size: 23px;
        }

        .stat span {
            color: var(--muted);
            font-size: 13px;
        }

        .section {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 15px;
            padding: 30px;
            margin-bottom: 22px;
            box-shadow: 0 5px 20px #1b2b4508;
        }

        .section h2 {
            font-size: 24px;
            margin-bottom: 15px;
            letter-spacing: -.5px;
        }

        .section h3 {
            font-size: 17px;
            margin: 23px 0 10px;
        }

        .section p {
            color: var(--muted);
            margin-bottom: 13px;
        }

        .features {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
        }

        .feature {
            background: #fafaff;
            border: 1px solid var(--border);
            border-radius: 11px;
            padding: 17px;
        }

        .feature h3 {
            margin: 0 0 5px;
            color: var(--text);
        }

        .feature p {
            font-size: 14px;
            margin: 0;
        }

        .tech-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }

        .tech {
            padding: 8px 14px;
            background: var(--primary-light);
            color: #5142ac;
            border-radius: 7px;
            font-size: 13px;
            font-weight: 650;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 12px;
            font-size: 14px;
        }

        th, td {
            padding: 13px;
            border-bottom: 1px solid var(--border);
            text-align: left;
        }

        th {
            background: #f5f4fc;
            color: #45398c;
        }

        td {
            color: var(--muted);
        }

        pre {
            background: var(--code);
            color: #e6edf8;
            border-radius: 10px;
            padding: 20px;
            overflow-x: auto;
            font-size: 13px;
            line-height: 1.8;
            margin: 14px 0;
        }

        code {
            font-family: Consolas, monospace;
        }

        .notice {
            padding: 16px;
            background: #f0f8f4;
            border-left: 4px solid var(--green);
            border-radius: 8px;
            color: #286b4e;
            margin-top: 15px;
            font-size: 14px;
        }

        .warning {
            padding: 16px;
            background: #fff8e9;
            border-left: 4px solid #dc9b27;
            border-radius: 8px;
            color: #795a20;
            margin-top: 15px;
            font-size: 14px;
        }

        .steps {
            padding-left: 22px;
            color: var(--muted);
        }

        .steps li {
            margin: 10px 0;
        }

        .profile {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 20px;
            align-items: center;
        }

        .profile-links {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
        }

        footer {
            text-align: center;
            padding: 35px 20px;
            color: var(--muted);
            font-size: 13px;
        }

        @media(max-width: 700px) {
            .stats {
                grid-template-columns: repeat(2, 1fr);
            }

            .features {
                grid-template-columns: 1fr;
            }

            .section {
                padding: 21px;
            }

            .hero {
                padding: 55px 20px;
            }

            table {
                font-size: 12px;
            }

            th, td {
                padding: 9px;
            }
        }
    </style>
</head>

<body>

<header class="hero">
    <span class="tag">PYTHON · FASTAPI · AUTHENTICATION</span>

    <h1>AuthFlow</h1>

    <p>
        A lightweight authentication system demonstrating secure
        user registration, password hashing and JWT-based login
        without using a traditional database.
    </p>

    <div class="hero-buttons">
        <a class="btn btn-primary"
           href="https://signupandloginwithoutdb.onrender.com"
           target="_blank" rel="noopener">
            Live Demo ↗
        </a>

        <a class="btn btn-secondary"
           href="https://github.com/bharat19334/DevOps-Tasks"
           target="_blank" rel="noopener">
            GitHub Repository ↗
        </a>
    </div>
</header>

<main class="container">

    <div class="stats">
        <div class="stat">
            <strong>FastAPI</strong>
            <span>Backend Framework</span>
        </div>

        <div class="stat">
            <strong>JWT</strong>
            <span>Authentication</span>
        </div>

        <div class="stat">
            <strong>Argon2</strong>
            <span>Password Hashing</span>
        </div>

        <div class="stat">
            <strong>Render</strong>
            <span>Cloud Deployment</span>
        </div>
    </div>

    <section class="section" id="overview">
        <h2>01. Project Overview</h2>

        <p>
            AuthFlow is a web-based signup and login application
            developed using Python and FastAPI. It demonstrates
            how authentication can be implemented without a
            traditional database.
        </p>

        <p>
            User information is stored in a JSON file. Passwords
            are hashed using Argon2, and JSON Web Tokens (JWT)
            are used to authenticate users and protect API endpoints.
        </p>

        <div class="notice">
            <strong>Live Application:</strong>
            <a href="https://signupandloginwithoutdb.onrender.com"
               target="_blank" rel="noopener">
                signupandloginwithoutdb.onrender.com
            </a>
        </div>
    </section>

    <section class="section" id="features">
        <h2>02. Key Features</h2>

        <div class="features">
            <div class="feature">
                <h3>01. User Registration</h3>
                <p>Create new accounts using email and password.</p>
            </div>

            <div class="feature">
                <h3>02. Secure Password Hashing</h3>
                <p>Argon2 password hashing instead of plain-text storage.</p>
            </div>

            <div class="feature">
                <h3>03. JWT Authentication</h3>
                <p>Generate tokens after successful authentication.</p>
            </div>

            <div class="feature">
                <h3>04. Protected APIs</h3>
                <p>Restrict access to authenticated API endpoints.</p>
            </div>

            <div class="feature">
                <h3>05. User Dashboard</h3>
                <p>Display information for the authenticated user.</p>
            </div>

            <div class="feature">
                <h3>06. JSON Storage</h3>
                <p>Store user records without a traditional database.</p>
            </div>

            <div class="feature">
                <h3>07. Logout Functionality</h3>
                <p>Clear the browser's stored authentication token.</p>
            </div>

            <div class="feature">
                <h3>08. Cloud Deployment</h3>
                <p>Access the application through a live Render URL.</p>
            </div>
        </div>
    </section>

    <section class="section" id="technology">
        <h2>03. Technology Stack</h2>

        <div class="tech-grid">
            <span class="tech">Python</span>
            <span class="tech">FastAPI</span>
            <span class="tech">HTML5</span>
            <span class="tech">CSS3</span>
            <span class="tech">JavaScript</span>
            <span class="tech">JWT</span>
            <span class="tech">Argon2</span>
            <span class="tech">JSON</span>
            <span class="tech">Git</span>
            <span class="tech">GitHub</span>
            <span class="tech">Render</span>
        </div>
    </section>

    <section class="section" id="architecture">
        <h2>04. System Architecture</h2>

        <p>
            The application follows a simple client-server
            architecture.
        </p>

        <pre><code>
             USER
               |
               v
       HTML / CSS / JavaScript
               |
               v
            FastAPI
               |
        +------+------+
        |             |
        v             v
   JWT Auth      Argon2 Hashing
        |             |
        +------+------+
               |
               v
           users.json
          (File Storage)
        </code></pre>

        <h3>Authentication Workflow</h3>

        <ol class="steps">
            <li>User submits signup details.</li>
            <li>Backend validates the registration request.</li>
            <li>Password is hashed using Argon2.</li>
            <li>User information is saved in the JSON file.</li>
            <li>During login, the password hash is verified.</li>
            <li>A JWT token is generated after successful login.</li>
            <li>The token is used to access protected APIs.</li>
        </ol>
    </section>

    <section class="section" id="structure">
        <h2>05. Project Structure</h2>

        <pre><code>
Signup-Login-Without-Database/
│
├── app/
│   ├── __init__.py
│   └── main.py
│
├── frontend/
│   ├── index.html
│   ├── signup.html
│   ├── dashboard.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── auth.js
│       └── dashboard.js
│
├── data/
│   └── users.json
│
├── requirements.txt
├── .gitignore
└── README.md
        </code></pre>
    </section>

    <section class="section" id="api">
        <h2>06. API Documentation</h2>

        <table>
            <thead>
                <tr>
                    <th>Method</th>
                    <th>Endpoint</th>
                    <th>Purpose</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>GET</td>
                    <td>/</td>
                    <td>Login Page</td>
                </tr>

                <tr>
                    <td>GET</td>
                    <td>/signup</td>
                    <td>Signup Page</td>
                </tr>

                <tr>
                    <td>GET</td>
                    <td>/dashboard</td>
                    <td>Dashboard Page</td>
                </tr>

                <tr>
                    <td>GET</td>
                    <td>/api/health</td>
                    <td>Health Check</td>
                </tr>

                <tr>
                    <td>POST</td>
                    <td>/api/signup</td>
                    <td>Register User</td>
                </tr>

                <tr>
                    <td>POST</td>
                    <td>/api/login</td>
                    <td>User Login</td>
                </tr>

                <tr>
                    <td>GET</td>
                    <td>/api/me</td>
                    <td>Authenticated User</td>
                </tr>

                <tr>
                    <td>GET</td>
                    <td>/api/protected</td>
                    <td>Protected Resource</td>
                </tr>
            </tbody>
        </table>

        <div class="notice">
            Protected endpoints require a valid JWT Bearer token.
        </div>
    </section>

    <section class="section" id="installation">
        <h2>07. Installation & Setup</h2>

        <h3>Prerequisites</h3>
        <p>Python 3.10+, Git and a code editor.</p>

        <h3>Step 1 — Clone Repository</h3>

        <pre><code>git clone https://github.com/bharat19334/DevOps-Tasks.git</code></pre>

        <h3>Step 2 — Navigate to Project</h3>

        <pre><code>cd DevOps-Tasks/Signup-Login-Without-Database</code></pre>

        <h3>Step 3 — Create Virtual Environment</h3>

        <pre><code>python -m venv venv</code></pre>

        <h3>Step 4 — Activate Environment</h3>

        <pre><code>venv\Scripts\activate</code></pre>

        <h3>Step 5 — Install Dependencies</h3>

        <pre><code>pip install -r requirements.txt</code></pre>

        <h3>Step 6 — Initialize JSON Storage</h3>

        <p>Create <code>data/users.json</code> and initialize it:</p>

        <pre><code>[]</code></pre>

        <h3>Step 7 — Configure Secret Key</h3>

        <pre><code>python -c "import secrets; print(secrets.token_urlsafe(32))"</code></pre>

        <p>
            Set the generated value as the <code>SECRET_KEY</code>
            environment variable.
        </p>

        <h3>Step 8 — Start Application</h3>

        <pre><code>uvicorn app.main:app --reload</code></pre>

        <h3>Step 9 — Open Browser</h3>

        <pre><code>http://127.0.0.1:8000</code></pre>
    </section>

    <section class="section" id="deployment">
        <h2>08. Cloud Deployment</h2>

        <p>
            AuthFlow is deployed as a Python Web Service on Render.
        </p>

        <table>
            <tr>
                <th>Configuration</th>
                <th>Value</th>
            </tr>

            <tr>
                <td>Platform</td>
                <td>Render</td>
            </tr>

            <tr>
                <td>Runtime</td>
                <td>Python</td>
            </tr>

            <tr>
                <td>Build Command</td>
                <td>pip install -r requirements.txt</td>
            </tr>

            <tr>
                <td>Start Command</td>
                <td>uvicorn app.main:app --host 0.0.0.0 --port $PORT</td>
            </tr>
        </table>

        <div class="warning">
            <strong>Storage Limitation:</strong>
            The application uses JSON file storage. Render's default
            filesystem is ephemeral, so user records may be lost after
            restarts or redeployments. Persistent storage is needed
            to retain records across deployments.
        </div>
    </section>

    <section class="section" id="security">
        <h2>09. Security Considerations</h2>

        <ul class="steps">
            <li>Passwords are hashed using Argon2.</li>
            <li>JWT tokens protect authenticated API endpoints.</li>
            <li>Keep SECRET_KEY in environment variables.</li>
            <li>Use HTTPS for network communication.</li>
            <li>Local storage has limitations in the presence of XSS.</li>
            <li>JSON file storage is not suitable for concurrent production workloads.</li>
            <li>Production deployments should consider HttpOnly cookies, rate limiting and persistent storage.</li>
        </ul>
    </section>

    <section class="section" id="learning">
        <h2>10. Learning Outcomes</h2>

        <ul class="steps">
            <li>Understanding authentication in FastAPI.</li>
            <li>Implementing secure password hashing.</li>
            <li>Understanding JWT token generation and validation.</li>
            <li>Creating protected API endpoints.</li>
            <li>Connecting JavaScript frontend with a Python backend.</li>
            <li>Managing user records using JSON files.</li>
            <li>Deploying a backend application on Render.</li>
            <li>Managing secrets through environment variables.</li>
        </ul>
    </section>

    <section class="section" id="future">
        <h2>11. Future Improvements</h2>

        <ul class="steps">
            <li>Email verification.</li>
            <li>Password reset functionality.</li>
            <li>Role-based access control.</li>
            <li>Refresh token support.</li>
            <li>Login rate limiting.</li>
            <li>PostgreSQL integration.</li>
            <li>Secure HttpOnly cookie-based sessions.</li>
            <li>Automated testing and CI/CD integration.</li>
        </ul>
    </section>

    <section class="section" id="author">
        <h2>12. About the Developer</h2>

        <div class="profile">
            <div>
                <h3 style="margin-top:0;">Bharat Goswami</h3>
                <p>B.Tech — Computer Science & Engineering (AI/ML)</p>
            </div>

            <div class="profile-links">
                <a href="https://github.com/bharat19334"
                   target="_blank" rel="noopener">GitHub ↗</a>

                <a href="https://www.linkedin.com/in/bharatgoswami19/"
                   target="_blank" rel="noopener">LinkedIn ↗</a>
            </div>
        </div>
    </section>

</main>

<footer>
    <p><strong>AuthFlow</strong> — Built with Python, FastAPI and JavaScript.</p>
    <p>Learning authentication fundamentals through practical implementation.</p>
    <p>© 2026 Bharat Goswami</p>
</footer>

</body>
</html>
