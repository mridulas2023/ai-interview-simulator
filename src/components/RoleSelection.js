function RoleSelection({
  roles,
  selectedRole,
  setSelectedRole,
  setStarted
}) {

  return (

    <div>

      <p>Select your interview role.</p>

      <div className="roles">

        {roles.map((role, index) => (

          <button
            key={index}
            className={
              selectedRole === role
                ? "roleButton active"
                : "roleButton"
            }
            onClick={() => setSelectedRole(role)}
          >
            {role}
          </button>

        ))}

      </div>

      {selectedRole && (

        <button
          className="startBtn"
          onClick={() => setStarted(true)}
        >
          Start Interview
        </button>

      )}

    </div>
  );
}

export default RoleSelection;