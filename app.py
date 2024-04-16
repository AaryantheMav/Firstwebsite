from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# In-memory store for user data
users = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/register', methods=['POST'])
def register():
    user_data = {
        'name': request.form['userName'],
        'phone': request.form['userPhone'],
        'email': request.form['userEmail']
    }
    users.append(user_data)
    # Write to a file each time a new user registers
    with open('C:/Users/Aaryan Kolekar/Desktop/First website/users.txt', 'a') as f:
        f.write(str(user_data) + "\n")
    print(users)  # For debugging purposes, to see what's stored
    return jsonify({'status': 'success', 'user': user_data})

if __name__ == '__main__':
    app.run(debug=True)
