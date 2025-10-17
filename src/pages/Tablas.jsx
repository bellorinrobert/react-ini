
import { useEffect, useMemo, useState } from "react"

import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight } from 'react-icons/fa';
import { FaEye, FaInfoCircle } from 'react-icons/fa'
import { Link } from "react-router-dom";
import ModalProd from "../components/ModalProd";

const API = 'https://dummyjson.com/products?limit=200'

const Tablas = () => {

    const [datos, setDatos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    //Filtrado
    const [searchTerm, setSearchTerm] = useState('');
    //Ordenamiento
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    //Paginar 
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    //filtro por categoria
    const [selectedCategory, setSelectedCategory] = useState('');





    const getDatos = async () => {
        try {
            const response = await fetch(API)
            if (!response.ok) {
                throw new Error("Http erro! status:" + response.status)
            }
            const data = await response.json()

            setDatos(data.products)
            setLoading(false)
        } catch (err) {
            setError(err.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        getDatos()
    }, [])
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    //Formateo
    const formatCurrency = (value) => {
        const numericValue = Number(value);
        if (isNaN(numericValue)) {
            return '0,00';
        }
        // Forzar formato con separador de miles siempre
        const parts = numericValue.toFixed(2).split('.');
        const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        const decimalPart = parts[1];
        return `${integerPart},${decimalPart}`;
    };

    const formatNumber = (value) => {
        const numericValue = Number(value);
        if (isNaN(numericValue)) {
            return '0';
        }
        // Formato sin decimales
        const integerValue = Math.round(numericValue);
        return integerValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    //Ordenar
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    //
    const totalStock = datos.reduce((sum, item) => sum + Number(item.stock), 0);
    const totalInventoryValue = datos.reduce((sum, item) => sum + Number(item.price) * Number(item.stock), 0);
    //Filtrado 
    const filteredDataOld = datos.filter(item =>
        (item.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (item.brand?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (item.category?.toLowerCase() || '').includes(searchTerm.toLowerCase())

    );

    const filteredData = useMemo(() => {
            return datos.filter(item => {
                const matchesSearch = 
                (item.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                (item.brand?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                (item.category?.toLowerCase() || '').includes(searchTerm.toLowerCase());

                const matchesCategory = selectedCategory === '' || selectedCategory === 'Todas' || item.category === selectedCategory;

                return matchesSearch && matchesCategory;
            });
        }, [datos, searchTerm, selectedCategory]);

    /**
     *  Se usa useMemo para optimizar, evitando reordenar en cada render.
        Se crea una copia con [...] para no modificar el arreglo original.
        Se usa .sort() con lógica para strings (mayúsculas/minúsculas y números) y valores numéricos.
        Se devuelve la lista ordenada.
     */

    const sortedData = useMemo(() => {
        if (!sortConfig.key) return filteredData;

        return [...filteredData].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            if (aValue === bValue) return 0;

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return sortConfig.direction === 'asc'
                    ? aValue.localeCompare(bValue, 'es', { numeric: true })
                    : bValue.localeCompare(aValue, 'es', { numeric: true });
            }

            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [filteredData, sortConfig]);
    //paginar
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedData.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedData, currentPage, itemsPerPage]);
    //filtro por categoria
    const categories = useMemo(() => {
        const cats = datos.map(item => item.category);
        return ['Todas', ...new Set(cats)].sort(); // 'Todas' al inicio
    }, [datos]);
    const totalStockf = filteredData.reduce((sum, item) => sum + Number(item.stock), 0);
    const totalInventoryValuef = filteredData.reduce((sum, item) => sum + Number(item.price) * Number(item.stock), 0);

    const getPageNumbers = () => {
        const delta = 2; // Cuántos botones a cada lado de la página actual
        const range = [];
        const rangeWithDots = [];

        for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
            range.push(i);
        }

        if (range[0] > 1) {
            rangeWithDots.push(1);
            if (range[0] > 2) rangeWithDots.push('...');
        }

        rangeWithDots.push(...range);

        if (range[range.length - 1] < totalPages) {
            if (range[range.length - 1] < totalPages - 1) rangeWithDots.push('...');
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots;
    };



    if (loading) {
        return (
            <div>Cargando</div>
        )
    }

    if (error) {
        return (
            <div>Error cargando</div>
        )
    }

    return (
        <div className="container">
            <h4 className="text-center py-4">Tablas</h4>
            <div>
                <p className="text-center fs-4 text-info">
                    Total inventario: {formatCurrency(totalInventoryValue)}
                </p>
            </div>
            <div className="row justify-content-end">

                <div className="col-md-6">
                    <div className="d-flex justify-content-between">
                        <nav>
                            <ul className="pagination">
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => goToPage(1)} disabled={currentPage === 1}>
                                        <FaAngleDoubleLeft />
                                    </button>
                                </li>
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={prevPage} disabled={currentPage === 1}>
                                        <FaAngleLeft />
                                    </button>
                                </li>
                                {getPageNumbers().map((pageNum, index) => (
                                    <li
                                        key={index}
                                        className={`page-item ${pageNum === currentPage ? 'active' : ''} ${pageNum === '...' ? 'disabled' : ''}`}
                                    >
                                        {pageNum === '...' ? (
                                            <span className="page-link">...</span>
                                        ) : (
                                            <button
                                                className="page-link"
                                                onClick={() => goToPage(pageNum)}
                                            >
                                                {pageNum}
                                            </button>
                                        )}
                                    </li>
                                ))}

                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={nextPage} disabled={currentPage === totalPages}>
                                        <FaAngleRight />
                                    </button>
                                </li>
                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => goToPage(totalPages)}
                                        disabled={currentPage === totalPages}
                                    >
                                        <FaAngleDoubleRight />
                                    </button>
                                </li>
                                <li>
                                    <select
                                        value={itemsPerPage}
                                        onChange={(e) => {
                                            setItemsPerPage(Number(e.target.value));
                                            setCurrentPage(1); // Reiniciar a página 1 al cambiar items per page
                                        }}
                                        className="form-select w-auto d-inline-block ms-2"
                                    >
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                        <option value={30}>30</option>
                                        <option value={100}>100</option>
                                    </select>
                                </li>
                            </ul>

                        </nav>

                    </div>
                </div>
                <div className="col-md-3 my-1">
                     <select
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
                {categories.map((cat, index) => (
                <option key={index} value={cat === 'Todas' ? '' : cat}>
                    {cat}
                </option>
                ))}
            </select>

                </div>
                <div className="col-md-3 my-1">
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Buscar por nombre, marca o categoría..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                </div>
            </div>

            <div>
                <table class="table">
                    <thead className="table-info">
                        <tr>
                            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('id')}>
                                ID
                                {sortConfig.key === 'id' ? (
                                    sortConfig.direction === 'asc' ? <FaSortUp className="ms-2 fs-3 text-success" /> : <FaSortDown className="ms-2 fs-3 text-success" />
                                ) : (
                                    <FaSort className="ms-2 fs-3" />
                                )}
                            </th>
                            <th>Imagen</th>
                            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('title')}>
                                Nombre
                                {sortConfig.key === 'title' ? (
                                    sortConfig.direction === 'asc' ? <FaSortUp className="ms-2 fs-3 text-success" /> : <FaSortDown className="ms-2 fs-3 text-success" />
                                ) : (
                                    <FaSort className="ms-2 fs-3" />
                                )}
                            </th>
                            <th scope="col">Categoria</th>
                            <th scope="col">Marcas</th>
                            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('price')}>
                                Precio
                                {sortConfig.key === 'price' ? (
                                    sortConfig.direction === 'asc' ? <FaSortUp className="ms-2 fs-3 text-success" /> : <FaSortDown className="ms-2 fs-3 text-success" />
                                ) : (
                                    <FaSort className="ms-2 fs-3" />
                                )}
                            </th>
                            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('stock')}>
                                Stock
                                {sortConfig.key === 'stock' ? (
                                    sortConfig.direction === 'asc' ? <FaSortUp className="ms-2 fs-3 text-success" /> : <FaSortDown className="ms-2 fs-3 text-success" />
                                ) : (
                                    <FaSort className="ms-2 fs-3" />
                                )}
                            </th>

                            <th scope="col">Total</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">

                        {
                            paginatedData.map((e, index) => (

                                <tr key={index}>
                                    <td>{e.id}</td>
                                    <td><img src={e.thumbnail} alt={e.title} width={50} /></td>
                                    <td className="text-start">{e.title}</td>
                                    <td>{e.category}</td>
                                    <td>{e.brand}</td>
                                    <td>{formatCurrency(e.price)}</td>
                                    <td>{formatNumber(e.stock)}</td>
                                    <td className="text-end">{formatCurrency(e.stock * e.price)}</td>
                                    <td>
                                        <Link to={`/detalle/${e.id}/${e.title}`} href="#"
                                            className="btn btn-sm btn-outline-primary me-2"
                                            title="Ver detalle"
                                        >
                                            <FaEye />
                                        </Link>
                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            title="Más información"
                                            data-bs-toggle="modal"
                                            data-bs-target={`#modal-${e.id}`}
                                        >
                                            <FaInfoCircle />
                                        </button>

                                    </td>

                                </tr>

                            ))
                        }

                    </tbody >
                    <tfoot className="table-info" >
                        {searchTerm && (

                            <tr>

                                <th colSpan={5} className="text-center" scope="col">Total ...</th>
                                <th scope="col">{formatNumber(totalStockf)}</th>
                                <th scope="col" className="text-end">{formatCurrency(totalInventoryValuef)}</th>
                            </tr>

                        )}

                        {!searchTerm && (
                            <tr>

                                <th colSpan={5} className="text-center" scope="col">Total ...</th>
                                <th scope="col">{formatNumber(totalStock)}</th>
                                <th scope="col" className="text-end">{formatCurrency(totalInventoryValue)}</th>
                            </tr>

                        )}

                    </tfoot>
                </table>
                <div>

                </div>
            </div>
            <div className="col-md-8">
                <div className="d-flex justify-content-between">
                    <nav>
                        <ul className="pagination">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => goToPage(1)} disabled={currentPage === 1}>
                                    <FaAngleDoubleLeft />
                                </button>
                            </li>
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={prevPage} disabled={currentPage === 1}>
                                    <FaAngleLeft />
                                </button>
                            </li>
                            {getPageNumbers().map((pageNum, index) => (
                                <li
                                    key={index}
                                    className={`page-item ${pageNum === currentPage ? 'active' : ''} ${pageNum === '...' ? 'disabled' : ''}`}
                                >
                                    {pageNum === '...' ? (
                                        <span className="page-link">...</span>
                                    ) : (
                                        <button
                                            className="page-link"
                                            onClick={() => goToPage(pageNum)}
                                        >
                                            {pageNum}
                                        </button>
                                    )}
                                </li>
                            ))}

                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={nextPage} disabled={currentPage === totalPages}>
                                    <FaAngleRight />
                                </button>
                            </li>
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button
                                    className="page-link"
                                    onClick={() => goToPage(totalPages)}
                                    disabled={currentPage === totalPages}
                                >
                                    <FaAngleDoubleRight />
                                </button>
                            </li>
                            <li>
                                <select
                                    value={itemsPerPage}
                                    onChange={(e) => {
                                        setItemsPerPage(Number(e.target.value));
                                        setCurrentPage(1); // Reiniciar a página 1 al cambiar items per page
                                    }}
                                    className="form-select w-auto d-inline-block ms-2"
                                >
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={30}>30</option>
                                    <option value={100}>100</option>
                                </select>
                            </li>
                        </ul>

                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Tablas