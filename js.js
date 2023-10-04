function app() {
  const canvas = document.getElementById("lienzo");
  const ctx = canvas.getContext("2d");
  const coordenadasElement = document.getElementById("coordenadas");

  const gato = {
    estados: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    turnoJugador: 1,
    colores: ["blue", "red"], // Colores para el jugador1 y jugador2

    pintarRejilla: function () {
      ctx.strokeStyle = "grey";
      ctx.lineWidth = 1;

      const gridSize = 100;

      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }

      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }

      ctx.stroke();
    },

    escenario: function () {
      ctx.lineWidth = 15;
      ctx.strokeStyle = "black";

      ctx.beginPath();
      ctx.moveTo(100, 200);
      ctx.lineTo(400, 200);
      ctx.moveTo(100, 300);
      ctx.lineTo(400, 300);
      ctx.moveTo(100, 400);

      ctx.moveTo(200, 100);
      ctx.lineTo(200, 400);
      ctx.moveTo(300, 100);
      ctx.lineTo(300, 400);

      ctx.stroke();
    },

    dibujar: function () {
      for (let i = 0; i < this.estados.length; i++) {
        for (let j = 0; j < this.estados[i].length; j++) {
          if (this.estados[i][j] !== 0) {
            ctx.fillStyle = this.colores[this.estados[i][j] > 0 ? 0 : 1];
            ctx.fillRect(j * 100 + 110, i * 100 + 110, 80, 80);
          }
        }
      }
    },

    cambiarJugador: function () {
      this.turnoJugador *= -1;
      document.getElementById("turno").textContent = `Turno: Jugador ${this.turnoJugador > 0 ? 1 : 2}`;
    },

    seleccionar: function (e) {
      const x = e.offsetX;
      const y = e.offsetY;
      coordenadasElement.textContent = `Coordenadas: (${x}, ${y})`;

      // Coordenadas específicas para cada cuadro
      const coordenadasCuadros = [
        { x: 100, y: 100 },
        { x: 200, y: 100 },
        { x: 300, y: 100 },
        { x: 100, y: 200 },
        { x: 200, y: 200 },
        { x: 300, y: 200 },
        { x: 100, y: 300 },
        { x: 200, y: 300 },
        { x: 300, y: 300 },
      ];

      for (let i = 0; i < coordenadasCuadros.length; i++) {
        const cuadro = coordenadasCuadros[i];
        if (x >= cuadro.x && x <= cuadro.x + 90 && y >= cuadro.y && y <= cuadro.y + 90 && this.estados[Math.floor(i / 3)][i % 3] === 0) {
          this.estados[Math.floor(i / 3)][i % 3] = this.turnoJugador;
          // Dibujar el cambio en el lienzo
          this.limpiarPintura();
          this.pintarRejilla();
          this.escenario();
          this.dibujar();
          // Cambiar al siguiente jugador
          this.cambiarJugador();
          // Eliminar eventos después de hacer clic
          canvas.removeEventListener("mousedown", this.seleccionar.bind(this));
          canvas.removeEventListener("mousemove", this.pintarHover.bind(this));
        }
      }
    },

    pintarHover: function (e) {
      const x = e.offsetX;
      const y = e.offsetY;

      // Coordenadas específicas para cada cuadro
      const coordenadasCuadros = [
        { x: 100, y: 100 },
        { x: 200, y: 100 },
        { x: 300, y: 100 },
        { x: 100, y: 200 },
        { x: 200, y: 200 },
        { x: 300, y: 200 },
        { x: 100, y: 300 },
        { x: 200, y: 300 },
        { x: 300, y: 300 },
      ];

      for (let i = 0; i < coordenadasCuadros.length; i++) {
        const cuadro = coordenadasCuadros[i];
        const row = Math.floor(i / 3);
        const col = i % 3;

        if (x >= cuadro.x && x <= cuadro.x + 90 && y >= cuadro.y && y <= cuadro.y + 90 && this.estados[row][col] === 0) {
          this.limpiarPintura(); // Limpiar antes de dibujar
          this.pintarRejilla();
          this.escenario();
          this.dibujar(); // Dibujar el estado actual
          ctx.fillStyle = this.colores[this.turnoJugador > 0 ? 0 : 1];
          ctx.fillRect(cuadro.x, cuadro.y, 90, 90);
        }
      }
    },

    limpiarPintura: function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    },

    
    activarEstados: function () {
      this.estados = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];
      this.turnoJugador = 1;
    },

    play: function () {
      this.pintarRejilla();
      this.escenario();
      canvas.addEventListener("mousedown", this.seleccionar.bind(this));
      canvas.addEventListener("mousemove", this.pintarHover.bind(this));
    },
  };

  window.activarEstados = function () {
    gato.activarEstados();
    document.getElementById("turno").textContent = `Turno: Jugador 1`;
  };

  window.onload = function () {
    gato.play();
  };
}

// Llama a la función app para que se ejecute
app();