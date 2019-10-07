var documenterSearchIndex = {"docs":
[{"location":"extra/#Additional-Tools-1","page":"Additional Tools","title":"Additional Tools","text":"","category":"section"},{"location":"extra/#","page":"Additional Tools","title":"Additional Tools","text":"There are many handy tools implemented in ADCME for analysis, benchmarking, input/output, etc. ","category":"page"},{"location":"extra/#Benchmarking-1","page":"Additional Tools","title":"Benchmarking","text":"","category":"section"},{"location":"extra/#","page":"Additional Tools","title":"Additional Tools","text":"The functions tic and toc can be used for recording the runtime between two operations. tic starts a timer for performance measurement while toc marks the termination of the measurement. Both functions are bound with one operations. For example, we can benchmark the runtime for svd","category":"page"},{"location":"extra/#","page":"Additional Tools","title":"Additional Tools","text":"A = constant(rand(10,20))\nA = tic(A)\nr = svd(A)\nB = r.U*diagm(r.S)*r.Vt \nB, t = toc(B)\nrun(sess, B)\nrun(sess, t)","category":"page"},{"location":"extra/#","page":"Additional Tools","title":"Additional Tools","text":"tic\ntoc","category":"page"},{"location":"extra/#ADCME.tic","page":"Additional Tools","title":"ADCME.tic","text":"tic(o::PyObject, i::Union{PyObject, Integer}=0)\n\nConstruts a TensorFlow timer with index i. The start time record is right before o is executed.\n\n\n\n\n\n","category":"function"},{"location":"extra/#ADCME.toc","page":"Additional Tools","title":"ADCME.toc","text":"toc(o::PyObject, i::Union{PyObject, Integer}=0)\n\nReturns the elapsed time from last tic call with index i (default=0). The terminal time record is right before o is executed.\n\n\n\n\n\n","category":"function"},{"location":"extra/#Save-and-Load-Python-Object-1","page":"Additional Tools","title":"Save and Load Python Object","text":"","category":"section"},{"location":"extra/#","page":"Additional Tools","title":"Additional Tools","text":"psave\npload","category":"page"},{"location":"extra/#ADCME.psave","page":"Additional Tools","title":"ADCME.psave","text":"psave(o::PyObject, file::String)\n\nSaves a Python objection o to file. See also pload\n\n\n\n\n\n","category":"function"},{"location":"extra/#ADCME.pload","page":"Additional Tools","title":"ADCME.pload","text":"pload(file::String)\n\nLoads a Python objection from file. See also psave\n\n\n\n\n\n","category":"function"},{"location":"extra/#Save-and-Load-TensorFlow-Session-1","page":"Additional Tools","title":"Save and Load TensorFlow Session","text":"","category":"section"},{"location":"extra/#","page":"Additional Tools","title":"Additional Tools","text":"load\nsave","category":"page"},{"location":"extra/#ADCME.load","page":"Additional Tools","title":"ADCME.load","text":"load(sess::PyObject, file::String, vars::Union{PyObject, Nothing, Array{PyObject}}=nothing, args...; kwargs...)\n\nLoads the values of variables to the session sess from the file file. If vars is nothing, it loads values to all the trainable variables. See also save, load\n\n\n\n\n\nload(sw::Diary, dirp::String)\n\nLoads Diary from dirp.\n\n\n\n\n\n","category":"function"},{"location":"extra/#ADCME.save","page":"Additional Tools","title":"ADCME.save","text":"save(sess::PyObject, file::String, vars::Union{PyObject, Nothing, Array{PyObject}}=nothing, args...; kwargs...)\n\nSaves the values of vars in the session sess. The result is written into file as a dictionary. If vars is nothing, it saves all the trainable variables. See also save, load\n\n\n\n\n\nsave(sw::Diary, dirp::String)\n\nSaves Diary to dirp.\n\n\n\n\n\n","category":"function"},{"location":"extra/#Save-and-Load-Diary-1","page":"Additional Tools","title":"Save and Load Diary","text":"","category":"section"},{"location":"extra/#","page":"Additional Tools","title":"Additional Tools","text":"We can use TensorBoard to track a scalar value easily","category":"page"},{"location":"extra/#","page":"Additional Tools","title":"Additional Tools","text":"d = Diary(\"test\")\np = placeholder(1.0, dtype=Float64)\nb = constant(1.0)+p\ns = scalar(b, \"variable\")\nfor i = 1:100\n    write(d, i, run(sess, s, Dict(p=>Float64(i))))\nend\nactivate(d)","category":"page"},{"location":"extra/#","page":"Additional Tools","title":"Additional Tools","text":"Diary\nscalar\nactivate\nload\nsave\nwrite","category":"page"},{"location":"extra/#ADCME.Diary","page":"Additional Tools","title":"ADCME.Diary","text":"Diary(suffix::Union{String, Nothing}=nothing)\n\nCreates a diary at a temporary directory path. It returns a writer and the corresponding directory path\n\n\n\n\n\n","category":"type"},{"location":"extra/#ADCME.scalar","page":"Additional Tools","title":"ADCME.scalar","text":"scalar(o::PyObject, name::String)\n\nReturns a scalar summary object.\n\n\n\n\n\n","category":"function"},{"location":"extra/#ADCME.activate","page":"Additional Tools","title":"ADCME.activate","text":"activate(sw::Diary, port::Int64=6006)\n\nRunning Diary at http://localhost:port.\n\n\n\n\n\n","category":"function"},{"location":"extra/#Base.write","page":"Additional Tools","title":"Base.write","text":"write(sw::Diary, step::Int64, cnt::Union{String, Array{String}})\n\nWrites to Diary.\n\n\n\n\n\n","category":"function"},{"location":"customop/#Custom-Operators-1","page":"Custom Operators","title":"Custom Operators","text":"","category":"section"},{"location":"customop/#","page":"Custom Operators","title":"Custom Operators","text":"Custom operators are ways to add missing features in ADCME. Typically users do not have to worry about custom operators. However, in the following situation custom opreators might be very useful","category":"page"},{"location":"customop/#","page":"Custom Operators","title":"Custom Operators","text":"Direct implementation in ADCME is inefficient (bottleneck). \nThere are legacy codes users want to reuse, such as GPU-accelerated codes. \nSpecial acceleration techniques such as checkpointing scheme. ","category":"page"},{"location":"customop/#","page":"Custom Operators","title":"Custom Operators","text":"In the following, we present an example of implementing the sparse solver custom operator for Ax=b.","category":"page"},{"location":"customop/#","page":"Custom Operators","title":"Custom Operators","text":"Input: row vector ii, column vectorjj and value vector vv for the sparse coefficient matrix; row vector kk and value vector ff, matrix dimension d","category":"page"},{"location":"customop/#","page":"Custom Operators","title":"Custom Operators","text":"Output: solution vector u","category":"page"},{"location":"customop/#","page":"Custom Operators","title":"Custom Operators","text":"Create and modify the template file\nThe following command helps create the wrapper\ncustomop()\nThere will be a custom_op.txt in the current directory. Modify the template file \nMySparseSolver\nint32 ii(?)\nint32 jj(?)\ndouble vv(?)\nint32 kk(?)\ndouble ff(?)\nint32 d()\ndouble u(?) -> output\nThe first line is the name of the operator. It should always be in the camel case. \nThe 2nd to the 7th lines specify the input arguments, the signature is type+variable name+shape. For the shape, () corresponds to a scalar, (?) to a vector and (?,?) to a matrix. \nThe last line is the output, denoted by -> output. Note there must be a space before and after ->. \nThe following types are accepted: int32, int64, double, float, string, bool. The name of the arguments must all be in lower cases. ","category":"page"},{"location":"customop/#","page":"Custom Operators","title":"Custom Operators","text":"Implement core codes\nRun customop() again and there will be CMakeLists.txt, gradtest.jl, MySparseSolver.cpp appearing in the current directory. MySparseSolver.cpp is the main wrapper for the codes and gradtest.jl is used for testing the operator and its gradients. CMakeLists.txt is the file for compilation. \nCreate a new file MySparseSolver.h and implement both the forward simulation and backward simulation (gradients)\n#include <eigen3/Eigen/Sparse>\n#include <eigen3/Eigen/SparseLU>\n#include <vector>\n#include <iostream>\nusing namespace std;\ntypedef Eigen::SparseMatrix<double> SpMat; // declares a column-major sparse matrix type of double\ntypedef Eigen::Triplet<double> T;\n\nSpMat A;\n\nvoid forward(double *u, const int *ii, const int *jj, const double *vv, int nv, const int *kk, const double *ff,int nf,  int d){\n    vector<T> triplets;\n    Eigen::VectorXd rhs(d); rhs.setZero();\n    for(int i=0;i<nv;i++){\n      triplets.push_back(T(ii[i]-1,jj[i]-1,vv[i]));\n    }\n    for(int i=0;i<nf;i++){\n      rhs[kk[i]-1] += ff[i];\n    }\n    A.resize(d, d);\n    A.setFromTriplets(triplets.begin(), triplets.end());\n    auto C = Eigen::MatrixXd(A);\n    Eigen::SparseLU<SpMat> solver;\n    solver.analyzePattern(A);\n    solver.factorize(A);\n    auto x = solver.solve(rhs);\n    for(int i=0;i<d;i++) u[i] = x[i];\n}\n\nvoid backward(double *grad_vv, const double *grad_u, const int *ii, const int *jj, const double *u, int nv, int d){\n    Eigen::VectorXd g(d);\n    for(int i=0;i<d;i++) g[i] = grad_u[i];\n    auto B = A.transpose();\n    Eigen::SparseLU<SpMat> solver;\n    solver.analyzePattern(B);\n    solver.factorize(B);\n    auto x = solver.solve(g);\n    // cout << x << endl;\n    for(int i=0;i<nv;i++) grad_vv[i] = 0.0;\n    for(int i=0;i<nv;i++){\n      grad_vv[i] -= x[ii[i]-1]*u[jj[i]-1];\n    }\n}\nIn this implementation we have used Eigen library for solving sparse matrix. Other choices are also possible, such as algebraic multigrid methods. Note here for convenience we have created a global variable SpMat A;. This is not recommend if you want to run the code concurrently. \nCompile\nIt is recommend that you use the cmake, make and gcc provided by ADCME. ","category":"page"},{"location":"customop/#","page":"Custom Operators","title":"Custom Operators","text":"Variable Description\nADCME.CXX C++ Compiler\nADCME.CC C Compiler\nADCME.TFLIB libtensorflow_framework.so location\nADCME.CMAKE Cmake binary location\nADCME.MAKE Make binary location","category":"page"},{"location":"customop/#","page":"Custom Operators","title":"Custom Operators","text":"A simple way is to set the environment by\n```bash\nexport CC=<CC>\nexport CXX=<CXX>\nalias cmake=<CMAKE>\nalias make=<MAKE>\n```\nThe values such as `<CC>` are obtained from the last table. Run the following command","category":"page"},{"location":"customop/#","page":"Custom Operators","title":"Custom Operators","text":"bash    mkdir build    cd build    cmake ..    make -j","category":"page"},{"location":"customop/#","page":"Custom Operators","title":"Custom Operators","text":"Based on your operation system, you will create libMySparseSolver.{so,dylib,dll}. This will be the dynamic library to link in TensorFlow. ","category":"page"},{"location":"customop/#","page":"Custom Operators","title":"Custom Operators","text":"Test\nFinally, you could use gradtest.jl to test the operator and its gradients (specify appropriate data in gradtest.jl first). If you implement the gradients correctly, you will be able to obtain first order convergence for finite difference and second order convergence for automatic differentiation. \n(Image: custom_op)","category":"page"},{"location":"guidlines/#Custom-Operator-Guidelines-1","page":"Custom Operator Guidelines","title":"Custom Operator Guidelines","text":"","category":"section"},{"location":"guidlines/#","page":"Custom Operator Guidelines","title":"Custom Operator Guidelines","text":"Whenever memory is needed, one should allocate memory by TensorFlow context. ","category":"page"},{"location":"guidlines/#","page":"Custom Operator Guidelines","title":"Custom Operator Guidelines","text":"Tensor* tmp_var = nullptr;\nTensorShae tmp_shape({10,10});\nOP_REQUIRES_OK(ctx, ctx->allocate_temp(DT_FLOAT, tmp_shape, &tmp_var));","category":"page"},{"location":"guidlines/#","page":"Custom Operator Guidelines","title":"Custom Operator Guidelines","text":"There are three methods to allocate Tensors when an Op kernel executes (details)","category":"page"},{"location":"guidlines/#","page":"Custom Operator Guidelines","title":"Custom Operator Guidelines","text":"allocate_persistent: if the memory is used between Op invocations.\nallocate_temp: if the memory is used only within Compute.\nallocate_output: if the memory will be used as output","category":"page"},{"location":"guidlines/#Create-Custom-Variables-1","page":"Custom Operator Guidelines","title":"Create Custom Variables","text":"","category":"section"},{"location":"guidlines/#","page":"Custom Operator Guidelines","title":"Custom Operator Guidelines","text":"In this section, we analyze the codes in the file tensorflow/core/kernels/variable_ops.cc, tensorflow/core/kernels/variable_ops.h. The signature for VariableOp is","category":"page"},{"location":"guidlines/#","page":"Custom Operator Guidelines","title":"Custom Operator Guidelines","text":"REGISTER_OP(\"VariableV2\")\n    .Output(\"ref: Ref(dtype)\")\n    .Attr(\"shape: shape\")\n    .Attr(\"dtype: type\")\n    .Attr(\"container: string = ''\")\n    .Attr(\"shared_name: string = ''\")\n    .SetIsStateful()\n    .SetShapeFn(shape_inference::ExplicitShape);","category":"page"},{"location":"guidlines/#","page":"Custom Operator Guidelines","title":"Custom Operator Guidelines","text":"Since Variables will be updated during training, it is necessary to guarantee the thread safety. Therefore, each VariableOp instance will usually hold a private mutex","category":"page"},{"location":"guidlines/#","page":"Custom Operator Guidelines","title":"Custom Operator Guidelines","text":"  mutex init_mu_;","category":"page"},{"location":"guidlines/#","page":"Custom Operator Guidelines","title":"Custom Operator Guidelines","text":"In the implementation, ","category":"page"},{"location":"#ADCME-Documentation-1","page":"Getting Started","title":"ADCME Documentation","text":"","category":"section"},{"location":"#","page":"Getting Started","title":"Getting Started","text":"ADCME is suitable for conducting inverse modeling in scientific computing. The purpose of the package is to: (1) provide differentiable programming framework for scientific computing based on TensorFlow automatic differentiation (AD) backend; (2) adapt syntax to facilitate implementing scientific computing, particularly for numerical PDE discretization schemes; (3) supply missing functionalities in the backend (TensorFlow) that are important for engineering, such as sparse linear algebra, constrained optimization, etc. Applications include","category":"page"},{"location":"#","page":"Getting Started","title":"Getting Started","text":"full wavelength inversion\nreduced order modeling in solid mechanics\nlearning hidden geophysical dynamics\nphysics based machine learning\nparameter estimation in stochastic processes","category":"page"},{"location":"#","page":"Getting Started","title":"Getting Started","text":"The package inherents the scalability and efficiency from the well-optimized backend TensorFlow. Meanwhile, it provides access to incooperate existing C/C++ codes via the custom operators. For example, some functionalities for sparse matrices are implemented in this way and serve as extendable \"plugins\" for ADCME. ","category":"page"},{"location":"#Getting-Started-1","page":"Getting Started","title":"Getting Started","text":"","category":"section"},{"location":"#","page":"Getting Started","title":"Getting Started","text":"To install ADCME, use the following command:","category":"page"},{"location":"#","page":"Getting Started","title":"Getting Started","text":"using Pkg\nPkg.add(\"ADCME\")","category":"page"},{"location":"#","page":"Getting Started","title":"Getting Started","text":"to load the package, use","category":"page"},{"location":"#","page":"Getting Started","title":"Getting Started","text":"using ADCME","category":"page"}]
}
