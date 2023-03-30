const db = require('../database/database');

const dashboard = (req, res) => {
  if (req.user) {
    db.query('SELECT * FROM tasks WHERE user_id = ?', [req.user.id], (err, results) => {
      if (err) {
        console.log(err.message);
        res.send('<script>alert("Error al obtener la lista de tareas pendientes"); window.location.href="/auth/dashboard";</script>');
      } else {
        res.render('dashboard', { user: req.user, pendingTasks: results });
      }
    });
  } else {
    res.redirect('/');
  }
}

const completeTask = (req, res) => {
  const { id } = req.user;
  const taskIds = Object.keys(req.body).filter(key => key.startsWith('taskCheckbox_')).map(key => key.replace('taskCheckbox_', ''));

  if (taskIds.length === 0) {
    res.send('<script>alert("No has elegido ninguna tarea"); window.location.href="/auth/dashboard";</script>');
  } else {
    db.query('UPDATE tasks SET completed = true WHERE user_id = ? AND id IN (?)', [id, taskIds], (err, result) => {
      if (err) {
        console.log(err.message);
        res.send('<script>alert("Error al marcar las tareas como completadas"); window.location.href="/auth/dashboard";</script>');
      }
      res.redirect('/auth/dashboard');
    });
  }
}

const addTask = (req, res) => {
  const { description } = req.body;
  const { id } = req.user;
  if (description.length === 0) {
    res.send('<script>alert("Agrega una descripcion"); window.location.href="/auth/dashboard";</script>');
  } else {
    const sanitizedDescription = db.escape(description);

    db.query('SELECT * FROM tasks WHERE user_id = ? AND description = ?', [id, sanitizedDescription], (err, result) => {
      if (err) {
        console.log(err.message);
        res.status(500).send('Error al agregar tarea');
      } else if (result.length > 0) {
        res.send('<script>alert("La tarea ya existe"); window.location.href="/auth/dashboard";</script>');
      } else {
        // La tarea no existe, se puede agregar
        db.query('INSERT INTO tasks (user_id, description, completed) VALUES (?, ?, false)', [id, sanitizedDescription], (err, result) => {
          if (err) {
            console.log(err.message);
            res.send('<script>alert("Error al agregar tarea"); window.location.href="/auth/dashboard";</script>');
          } else {
            res.redirect('/auth/dashboard');
          }
        });
      }
    });
  }
}

const deleteTask = (req, res) => {
  db.query('DELETE FROM tasks WHERE id=?', 
  [req.params.id], (error, results)=>{
      if(error){
          throw error;
      }
      else{
        res.redirect('/auth/dashboard');
      }
  });
}

module.exports = {
  dashboard,
  completeTask,
  addTask,
  deleteTask,
};