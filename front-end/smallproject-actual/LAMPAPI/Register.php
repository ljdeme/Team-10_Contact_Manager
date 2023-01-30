<?php
	$inData = getRequestInfo();

	$FirstName = $inData["FirstName"];
	$LastName = $inData["LastName"];
	$Phone = $inData["Phone"];
	$Email = $inData["Email"];
	$Login = $inData["Login"];
	$Password = $inData["Password"];

	$conn = new mysqli("localhost","TheBeast","WeLoveCOP4331","COP4331");
	if ($conn->connect_error)
	{
		returnWithError($conn->connect_error);
	}
	else
	{
		/*$stmt = $conn->prepare("SELECT Login FROM Users WHERE Login = ?");
		$stmt->bind_param("s", $login);
		$stmt->execute();
		$result = $stmt->get_result();
		$stmt->close();

		if (is_null($result))
		{*/
			$stmt = $conn->prepare("INSERT into Users (FirstName, LastName, Phone, Email, Login, Password) VALUES (?,?,?,?,?,?)");
			$stmt->bind_param("ssssss", $FirstName, $LastName, $Phone, $Email, $Login, $Password);
			$stmt->execute();
			$stmt->close();
			$conn->close();
			returnWithError("");
		//}
		/*(else
		{
			returnWithError("Username already taken");
		}*/
	}

   	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
?>