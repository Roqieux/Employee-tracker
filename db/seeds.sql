INSERT INTO department (id, name)
VALUES  (001, "GoalKeepers"),
        (002, "Defense"),
        (003, "Midfield"),
        (004, "Forwards"),
        (099, "Management");


INSERT INTO roles (id, title, salary, department_id)
VALUES  (0001, "Keeper", 5200000, 001),
        (0002, "Center Back", 5000000, 002),
        (0003, "Left Back", 3500000, 002),
        (0004, "Right Back", 3500000, 002),
        (0005, "Center Back Stagger", 6000000, 002),
        (0006, "Center Midfield", 7500000, 003),
        (0007, "Left Midfield", 5500000, 003),
        (0008, "Right Midfield", 5500000, 003),
        (0009, "Left Forward", 9000000, 004),
        (0010, "Center Forward", 9500000, 004),
        (0011, "Right Forward", 9000000, 004),
        (0999, "Manager", 1500000, 099);


INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (001, "Hugo", "Lloris", 0001, 999),
        (005, "Jules", "Kounde", 0004, 999),
        (004, "Raphael", "Varane", 0002, 999),
        (022, "Theo", "Hernandez", 0003, 999),
        (018, "Dayot", "Upamecano", 0005, 999),
        (014, "Adrien", "Rabiot", 0006, 999),
        (008, "Aurelien", "Tchouameni", 0007, 999),
        (007, "Antoine", "Griezmann", 0008, 999),
        (010, "Kylian", "Mbappe", 0009, 999),
        (009, "Olivier", "Giroud", 0010, 999),
        (011, "Ousmane", "Dembele", 0011, 999),
        (999, "Didier", "Deschamps", 0999, null);