import { useEffect, useMemo, useState } from "react";
import { Card } from "primereact/card";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Rating } from "primereact/rating";
import { SelectButton } from "primereact/selectbutton";
import { formatCurrency } from "../util/funciones";
import { FilterMatchMode } from "primereact/api";
import { Dropdown } from "primereact/dropdown";
import { InputText } from 'primereact/inputtext';

import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';

const API = "https://dummyjson.com/products?limit=300";

const PrimeTable = () => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [sizeOptions] = useState([
    { label: "Small", value: "small" },
    { label: "Normal", value: "normal" },
    { label: "Large", value: "large" },
  ]);

  const [globalTotals, setGlobalTotals] = useState({});
  //filtro
  // filtros
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    brand: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    category: { value: null, matchMode: FilterMatchMode.EQUALS }, // Se usa EQUALS para selección de categoría
    price: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const [categoryFilter, setCategoryFilter] = useState(null);
      // filtros
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };
        const onCategoryFilterChange = (value) => {
        setCategoryFilter(value); // Actualiza el estado local del Dropdown

        let _filters = { ...filters };
        // 3. Aplica el valor al filtro de categoría (clave: 'category')
        _filters['category'].value = value;

        setFilters(_filters); // Actualiza los filtros de la DataTable
    };
  //sizes
  const [size, setSize] = useState(sizeOptions[1].value);

      const categories = useMemo(() => {
        // Obtenemos categorías únicas y las convertimos al formato { label: 'cat', value: 'cat' }
        const cats = [...new Set(datos.map(p => p.category))];
        return cats.sort().map(cat => ({ label: cat.toUpperCase(), value: cat }));
    }, [datos]);
  const getDatos = async () => {
    try {
      const response = await fetch(API);
      if (!response.ok) {
        throw new Error("Http erro! status:" + response.status);
      }
      const data = await response.json();
      setDatos(data.products);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDatos();
  }, []);

  if (loading) {
    return <div>Cargando</div>;
  }

  if (error) {
    return <div>Error cargando</div>;
  }

  //templates
  const imageBodyTemplate = (product) => {
    return (
      <img
        src={product.thumbnail}
        alt={product.title}
        className="img-fluid "
        width={80}
      />
    );
  };

  const ratingBodyTemplate = (product) => {
    return <Rating value={product.rating} readOnly cancel={false} />;
  };

  const getSeverity = (stock) => {
    if (stock > 50) return "success"; // verde
    else if (stock > 10 && stock <= 50) return "warning"; // amarillo
    else if (stock <= 10) return "danger"; // rojo
    return null;
  };

  const stockSeverityTemplate = (rowData) => {
    const severity = getSeverity(rowData.stock);
    return <span className={`badge bg-${severity}`}>{rowData.stock}</span>;
  };

  const textEditor = (options) => {
    return (
      <InputNumber
        value={options.value}
        onValueChange={(e) => options.editorCallback(e.value)}
        mode="decimal"
        showButtons
        min={0}
      />
    );
  };

  const subtotalTemplate = (product) => {
    return formatCurrency(product.price * product.stock);
  };

  return (
    <div className="container">
      <h4 className="text-center py-4">Lista de productos</h4>
      <div className="row ">
        <div className="col-md-4 ">
          <div className="d-flex justify-content-center mb-4">
            <SelectButton
              value={size}
              onChange={(e) => setSize(e.value)}
              options={sizeOptions}
            />
          </div>
        </div>
        <div className="col-md-4">
          <Dropdown
            value={categoryFilter}
            onChange={(e) => onCategoryFilterChange(e.value)}
            options={categories}
            optionLabel="label"
            optionValue="value" // Indicamos que el valor seleccionado es el string de la categoría
            placeholder="Filtrar por categoría"
            className="w-100"
            showClear // Permite borrar la selección
          />
        </div>
        <div className="col-md-4 ">
          <div className="d-flex justify-content-end mb-2">
            <IconField iconPosition="left" className="w-100">
              <InputIcon className="pi pi-search" />
              <InputText
                value={globalFilterValue}
                onChange={onGlobalFilterChange}
                className="w-100"
                placeholder="Buscar por nombre, categoria, precio, stock"
              />
            </IconField>
          </div>
        </div>
      </div>
      <Card>
        <DataTable
          value={datos}
          filters={filters}
          size={size}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: "50rem" }}

        >
          <Column field="id" sortable header="Id"></Column>
          <Column header="Image" body={imageBodyTemplate}></Column>
          <Column field="title" sortable header="Nombre"></Column>
          <Column
            field="category"
            sortable
            filter
            filterPlaceholder="Por categoria"
            header="Categoria"
          ></Column>
          <Column
            field="title"
            sortable
            header="Estrellas"
            body={ratingBodyTemplate}
          ></Column>
          <Column header="Est" body={stockSeverityTemplate} />
          <Column field="stock" sortable header="Stock"></Column>
          <Column
            field="price"
            header="Precio unitario"
            sortable
            body={(rowData) => formatCurrency(rowData.price)}
            className="text-end"
            editor={textEditor}
          ></Column>
          <Column
            field="price"
            header="Precio"
            sortable
            body={subtotalTemplate}
            className="text-end"
          ></Column>
        </DataTable>
      </Card>
    </div>
  );
};

export default PrimeTable;
