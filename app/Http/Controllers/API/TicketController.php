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

    /**
     * @OA\Post(
     *     path="/api/tickets",
     *     summary="Create a ticket",
     *     tags={"Tickets"},
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Ticket")
     *     ),
     *     @OA\Response(response=201, description="Ticket created"),
     * )
     */
    public function store(StoreTicketRequest $request): JsonResponse
    {
        $ticket = $this->ticketService->createTicket($request->validated(), Auth::user());
        return response()->json($ticket, 201);
    }

    /**
     * @OA\Get(
     *     path="/api/tickets/{id}",
     *     summary="Get a ticket with responses",
     *     tags={"Tickets"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="id", in="path", required=true),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(ref="#/components/schemas/Ticket")
     *     ),
     * )
     */
    public function show(Ticket $ticket): JsonResponse
    {
        $ticketWithDetails = $this->ticketService->getTicketWithDetails($ticket);
        return response()->json($ticketWithDetails);
    }

    }
