import axios from "axios";
import { useEffect, useState } from "react";
import "./addproduct.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [img, setImg] = useState("");
    const [price, setPrice] = useState(0);
    const [isUpdate, setIsUpdate] = useState(false);

    const [colorInput, setColorInput] = useState(""); // Trường input cho màu
    const [colors, setColors] = useState([]); // Mảng chứa các màu

    const [sizeInput, setSizeInput] = useState(""); // Trường input cho kích thước
    const [sizes, setSizes] = useState([]); // Mảng chứa các kích thước

    const [categoryInput, setCategoryInput] = useState(""); // Trường input cho kích thước
    const [categorys, setCategorys] = useState([]); // Mảng chứa các kích thước

    const [productData, setProductData] = useState([]); //lấy dữ liệu api
    const [idCurrent, setIdCurrent] = useState(null);

    const [userEmail, setUserEmail] = useState(true); //lay ra name cua user

    const [admin, setAdmin] = useState(true);

    // const [admin, setAdmin] = useState(fa)
    // console.log("userEmail", userEmail);

    //===========HANDLE COLOR==============================================================================
    const handleColorChange = () => {
        if (colorInput.trim() !== "") {
            // Tách chuỗi thành các màu riêng lẻ dựa trên dấu phẩy (,)
            const colorArray = colorInput
                .split(",")
                .map((color) => color.trim());
            setColors(colorArray);
            setColorInput(""); // Xóa giá trị trong trường input
        }
    };
    //===========HANLE SIZE==============================================================================
    const handleSizeChange = () => {
        if (sizeInput.trim() !== "") {
            // Tách chuỗi thành các kích thước riêng lẻ dựa trên dấu phẩy (,)
            const sizeArray = sizeInput.split(",").map((size) => size.trim());
            setSizes(sizeArray);
            setSizeInput(""); // Xóa giá trị trong trường input
        }
    };
    //===========HANLE CATEGORY==============================================================================
    const handleCategoryChange = () => {
        if (categoryInput.trim() !== "") {
            // Tách chuỗi thành các kích thước riêng lẻ dựa trên dấu phẩy (,)
            const categoryArray = categoryInput
                .split(",")
                .map((category) => category.trim());
            setCategorys(categoryArray);
            setCategoryInput(""); // Xóa giá trị trong trường input
        }
    };
    //===========SEND DATA TO BACKEND==============================================================================
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios
            .post(
                `http://localhost:3001/api/clothes/`,
                {
                    title,
                    desc,
                    price,
                    img,
                    color: colors,
                    size: sizes,
                    category: categorys,
                },
                { withCredentials: true }
            )
            .then((response) => {
                console.log("response", response);
                // Sau khi thêm sản phẩm thành công, bạn có thể cập nhật dữ liệu ngay lập tức.
                // Đảm bảo bạn cập nhật trạng thái productData với dữ liệu mới.
                // if (response.data.message === "You are not Admin") {
                //     alert("You are not Admin");
                // }

                setProductData([...productData, response.data]);
                setTitle("");
                setDesc("");
                setImg("");
                setPrice(0);
                setColors([]);
                setCategorys([]);
                setSizes([]);
            })
            .catch((error) => {
                console.error("Error fetching product data:", error);
            });
        console.log("Successfully");
    };
    //===========HANDLE DELETE ===========================================================================
    const [isDeleting, setIsDeleting] = useState(false);
    const handleDelete = (productId) => {
        setIsDeleting(true);
        axios
            .delete(`http://localhost:3001/api/clothes/${productId}`)
            .then(() => {
                // Product deleted successfully, set isDeleting to false
                setIsDeleting(false);
            })
            .catch((error) => {
                console.error("Error deleting product:", error);
                // Handle errors here
            });
    };

    //===========HANDLE EDIT==============================================================================
    const handleUpdate = (dataUpdateClothes) => {
        setIsUpdate(true);
        setIdCurrent(dataUpdateClothes._id);
        setTitle(dataUpdateClothes.title);
        setDesc(dataUpdateClothes.desc);
        setImg(dataUpdateClothes.img);
        setPrice(dataUpdateClothes.price);
        setColorInput(dataUpdateClothes.color);
        setSizeInput(dataUpdateClothes.size);
        setCategoryInput(dataUpdateClothes.category);
    };
    // final Update
    const finalUpdate = () => {
        axios
            .put(`http://localhost:3001/api/clothes/${idCurrent}`, {
                title,
                desc,
                price,
                img,
                color: colors,
                size: sizes,
                category: categorys,
            })
            .then((response) => {
                setProductData(response.data.result);
                console.log("res", response.data.result);
                setTitle("");
                setDesc("");
                setImg("");
                setColors([]);
                setCategorys([]);
                setSizes([]);
                setPrice(0);
                setIsUpdate(!isUpdate);
            })
            .catch((error) => {
                console.error("Error fetching product data:", error);
            });
        setIdCurrent(null);
    };

    //===========HANDLE OUT==============================================================================
    const handleOut = () => {
        axios
            .delete("http://localhost:3001/api/register/", {
                withCredentials: true,
            })
            .then((result) => {
                if (result.data.message === "Logout Success") {
                    alert("Logout success");
                    navigate("/login");
                }

                // navigate("/login");
            })
            .catch((err) => console.log(err));
    };
    //===========HANDLE GET DATA FROM BACKEND HWNE COMPONENT LOAD==============================================================================
    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get("http://localhost:3001/api/clothes/", {
                withCredentials: true,
            })
            .then((response) => {
                console.log(response);
                if (response.data.message === "You haven't login") {
                    navigate("/login");
                }
                setAdmin(response.data.userValue.admin);
                setProductData(response.data.result);
                setUserEmail(response.data.userValue.email);
                // console.log("res", response);
            })
            .catch((error) => {
                console.error("Error fetching product data:", error);
            });
    }, [admin, productData.length, isDeleting]);

    return (
        <div className="addProduct">
            {/* {console.log("id current", idCurrent)} */}
            <div className="top">
                {admin ? (
                    <form className="form" onSubmit={(e) => handleSubmit(e)}>
                        <div className="header">ADD PRODUCT</div>
                        <input
                            type="text"
                            id="title"
                            name="addTitle"
                            placeholder="Add title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <input
                            type="text"
                            id="img"
                            name="addImg"
                            placeholder="Add img"
                            value={img}
                            onChange={(e) => setImg(e.target.value)}
                        />
                        <input
                            id="desc"
                            type="text"
                            name="addDesc"
                            placeholder="Add desc"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                        <input
                            id="price"
                            type="number"
                            name="addPrice"
                            placeholder="Add price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <input
                            id="color"
                            type="text"
                            name="addColor"
                            placeholder="Add color"
                            value={colorInput}
                            onChange={(e) => setColorInput(e.target.value)}
                        />
                        <button type="button" onClick={handleColorChange}>
                            Add Color
                        </button>
                        <input
                            id="size"
                            type="text"
                            name="addSize"
                            placeholder="Add size"
                            value={sizeInput}
                            onChange={(e) => setSizeInput(e.target.value)}
                        />
                        <button type="button" onClick={handleSizeChange}>
                            Add Size
                        </button>

                        <input
                            id="category"
                            type="text"
                            name="addCategory"
                            placeholder="Add Category"
                            value={categoryInput}
                            onChange={(e) => setCategoryInput(e.target.value)}
                        />
                        <button type="button" onClick={handleCategoryChange}>
                            Add category
                        </button>

                        {!isUpdate ? (
                            <button type="submit">Submit</button>
                        ) : (
                            <button type="button" onClick={() => finalUpdate()}>
                                Update
                            </button>
                        )}
                    </form>
                ) : (
                    ""
                )}

                <div className="authen">
                    {!userEmail ? (
                        <div>
                            <Link to="/login">
                                <div className="authenitem">Login</div>
                            </Link>
                            <Link to="/register">
                                <div className="authenitem">Register</div>
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div style={{ paddingRight: "15px" }}>
                                User: {userEmail}
                            </div>
                            <button onClick={handleOut}>Logout</button>
                        </>
                    )}
                </div>
            </div>

            <div className="displayProduct">
                {Array.isArray(productData) &&
                    productData.map((data, index) => (
                        <div className="product" key={index}>
                            {admin ? (
                                <div className="div">
                                    <button
                                        onClick={() => handleDelete(data._id)}
                                    >
                                        delete
                                    </button>
                                    <button onClick={() => handleUpdate(data)}>
                                        Sửa
                                    </button>
                                </div>
                            ) : (
                                ""
                            )}
                            <div className="imgcontain">
                                <img src={data.img} alt={data.title} />
                            </div>
                            <div className="info">
                                <div className="title">{data.title}</div>
                                <div className="color">
                                    {data.color ? data.color.join(", ") : ""}
                                </div>
                                <div className="size">
                                    {data.size ? data.size.join(", ") : ""}
                                </div>
                                <div className="price">{data.price}</div>
                                <div className="category">
                                    {data.category
                                        ? data.category.join(", ")
                                        : ""}
                                </div>
                                <div className="desc">{data.desc}</div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
