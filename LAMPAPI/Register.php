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
		$stmt = $conn->prepare("SELECT Login FROM Users WHERE Login = ?");
		$stmt->bind_param("s", $Login);
		$stmt->execute();
		$duplicateLogin = $stmt->get_result();
		$stmt->close();
	
		$stmt = $conn->prepare("SELECT Email FROM Users WHERE Email = ?");
		$stmt->bind_param("s", $Email);
		$stmt->execute();
		$duplicateEmail = $stmt->get_result();
		$stmt->close();

		if (($duplicateLogin->num_rows == 0) && ($duplicateEmail->num_rows == 0))
		{
			$stmt = $conn->prepare("INSERT into Users (FirstName, LastName, Phone, Email, Login, Password) VALUES (?,?,?,?,?,?)");
			$stmt->bind_param("ssssss", $FirstName, $LastName, $Phone, $Email, $Login, $Password);
			$stmt->execute();
			$stmt->close();
			$conn->close();
			returnWithError("");
		}
		else if (($duplicateLogin->num_rows > 0) && ($duplicateEmail->num_rows == 0))
		{
			returnWithError("Username already taken");
		}
		else
		{
			returnWithError("User with email already exists");
		}
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
