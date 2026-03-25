const API_URL = "http://localhost:3000/api";

export const getProductos = async () => {
  const res = await fetch(`${API_URL}/productos`);
  return res.json();
};

export const crearPedido = async (pedido) => {
  const res = await fetch("http://localhost:3000/api/pedidos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(pedido)
  });

  return res.json();
};