function successResponse(res, data, status = 200) {
    res.status(status).json({
      success: true,
      data,
    });
  }
  function failResponse(res, err = 'Something went wrong', status = 500) {
    res.status(status).json({
      success: false,
      error: [err],
    });
  }
  
  module.exports = {
    successResponse,
    failResponse,
  };
  