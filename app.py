from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

tasks = ['Shower', 'Eat', 'Study']

@app.route('/')
def index():
	return render_template('index.html', tasks=tasks)

@app.route('/add', methods=['POST'])
def add_task():
	new_task = request.form.get('newTask')
	if new_task:
		tasks.append(new_task)
	return redirect(url_for('index'))

@app.route('/complete', methods=['POST'])
def complete_tasks():
	completed_tasks = request.form.getlist('taskCheckbox')
	for index in map(int, completed_tasks):
		if 1 <= index <= len(tasks):
			if 'Completed' not in tasks[index - 1]:
				tasks[index - 1] += " - Completed"
	return redirect(url_for('index'))

@app.route('/delete', methods=['POST'])
def delete_tasks():
	tasks_to_delete = request.form.getlist('taskCheckbox')
	tasks_to_delete.sort(reverse=True)
	for index in map(int, tasks_to_delete):
		if 1 <= index <= len(tasks):
			del tasks[index - 1]
	return redirect(url_for('index'))

if __name__ == '__main__':
	app.run(debug=True)