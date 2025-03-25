<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\Ticket\StoreTicketRequest;
use App\Http\Requests\Ticket\UpdateTicketRequest;
use App\Models\Ticket;
use App\Services\TicketService;
use App\Services\ResponseService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
class TicketController extends Controller
{
    use AuthorizesRequests;
    protected $ticketService;
    protected $responseService;


    public function __construct(TicketService $ticketService, ResponseService $responseService)
    {
        $this->ticketService = $ticketService;
        $this->responseService = $responseService;
    }

    /**
     * @OA\Get(
     *     path="/api/tickets",
     *     summary="Get user's tickets",
     *     tags={"Tickets"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(response=200, description="Successful operation"),
     * )
     */
    public function index(): JsonResponse
    {
        $tickets = $this->ticketService->getAllTicketsForUser(Auth::user());
        return response()->json($tickets);
    }
    }
