import React from "react";
import { useRouter } from "next/router";

function AdminProduct({
  id,
  name,
  description,
  published,
  price,
  material,
  images,
}) {
  let router = useRouter();

  return (
    <>
      <tr onClick={() => router.push("/admin/products/" + id)} key={id}>
        <td>{id}</td>
        <td>{name}</td>
        <td>
          {published ? "Ja" : "Nein"} {/* add a checkbox here */}
        </td>
        <td className="d-flex justify-content-between">
          <span>
          € 
          </span>
          <span>
          {price.toFixed(2)}
          </span>
          </td>
        <td>{material}</td>
      </tr>
    </>
  );
}

export default AdminProduct;
